import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { MessageModalService } from '../../services/message-modal.service';
import { TranslationService } from '../../services/translation.service';
import { SiteDetectionService } from '../../services/site-detection.service';

interface CargoOption {
  value: string;
  labelKey: string;
}

interface FormField {
  value: string;
  touched: boolean;
  error: string;
}

interface ContactForm {
  fullName: FormField;
  phone: FormField;
  email: FormField;
  origin: FormField;
  destination: FormField;
  cargoType: FormField;
  notes: FormField;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './contact.html',
})
export class ContactComponent implements OnInit {
  private messageModalService = inject(MessageModalService);
  private translationService = inject(TranslationService);
  private route = inject(ActivatedRoute);
  private document = inject(DOCUMENT);
  private siteDetection = inject(SiteDetectionService);

  isExpress = this.siteDetection.isExpress;

  handoffRequired = signal(false);
  submissionAttempted = signal(false);

  form = signal<ContactForm>({
    fullName: { value: '', touched: false, error: '' },
    phone: { value: '', touched: false, error: '' },
    email: { value: '', touched: false, error: '' },
    origin: { value: '', touched: false, error: '' },
    destination: { value: '', touched: false, error: '' },
    cargoType: { value: '', touched: false, error: '' },
    notes: { value: '', touched: false, error: '' },
  });

  private medicalCargoOptions: CargoOption[] = [
    { value: 'Medical Supplies', labelKey: 'contact.form.cargoOptions.medicalSupplies' },
    { value: 'Laboratory Specimens', labelKey: 'contact.form.cargoOptions.laboratorySpecimens' },
    { value: 'Pharmaceutical Products', labelKey: 'contact.form.cargoOptions.pharmaceuticalProducts' },
    { value: 'Medical Equipment', labelKey: 'contact.form.cargoOptions.medicalEquipment' },
    { value: 'Blood / Blood Products', labelKey: 'contact.form.cargoOptions.bloodProducts' },
    { value: 'Biohazardous Materials', labelKey: 'contact.form.cargoOptions.biohazardousMaterials' },
    { value: 'Other', labelKey: 'contact.form.cargoOptions.other' },
  ];

  private expressCargoOptions: CargoOption[] = [
    { value: 'Same-Day Delivery', labelKey: 'express.contact.form.cargoOptions.sameDay' },
    { value: 'Regional Delivery', labelKey: 'express.contact.form.cargoOptions.regional' },
    { value: 'Specialized Transport', labelKey: 'express.contact.form.cargoOptions.specialized' },
    { value: 'Documents', labelKey: 'express.contact.form.cargoOptions.documents' },
    { value: 'E-commerce', labelKey: 'express.contact.form.cargoOptions.ecommerce' },
    { value: 'Automobiles', labelKey: 'express.contact.form.cargoOptions.automobiles' },
    { value: 'Agriculture', labelKey: 'express.contact.form.cargoOptions.agriculture' },
    { value: 'Food & Beverage', labelKey: 'express.contact.form.cargoOptions.foodBeverage' },
    { value: 'Machinery', labelKey: 'express.contact.form.cargoOptions.machinery' },
    { value: 'Other', labelKey: 'express.contact.form.cargoOptions.other' },
  ];

  cargoOptions = computed(() =>
    this.isExpress() ? this.expressCargoOptions : this.medicalCargoOptions,
  );

  ngOnInit(): void {
    const params = this.route.snapshot.queryParamMap;
    const prefilledFields: Partial<Record<keyof ContactForm, string>> = {
      fullName: params.get('fullName') ?? '',
      phone: params.get('phone') ?? '',
      origin: params.get('origin') ?? '',
      cargoType: params.get('cargoType') ?? '',
    };

    for (const [field, value] of Object.entries(prefilledFields)) {
      if (value) {
        this.updateField(field as keyof ContactForm, value, false);
      }
    }
  }

  get f(): ContactForm {
    return this.form();
  }

  updateField(field: keyof ContactForm, value: string, touched = true): void {
    const current = this.form();
    const error = this.validateField(field, value);
    this.form.set({ ...current, [field]: { value, touched, error } });
    this.handoffRequired.set(false);
  }

  blurField(field: keyof ContactForm): void {
    const current = this.form();
    const currentField = current[field];
    const error = this.validateField(field, currentField.value);
    this.form.set({ ...current, [field]: { ...currentField, touched: true, error } });
  }

  isFormValid(): boolean {
    const current = this.form();
    const required: (keyof ContactForm)[] = [
      'fullName', 'phone', 'email', 'origin', 'destination', 'cargoType',
    ];
    return required.every((key) => !this.validateField(key, current[key].value));
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const current = this.form();
    const fields = Object.keys(current) as (keyof ContactForm)[];
    const updated = { ...current };

    fields.forEach((key) => {
      updated[key] = {
        ...current[key],
        touched: true,
        error: this.validateField(key, current[key].value),
      };
    });

    this.form.set(updated);
    this.submissionAttempted.set(true);

    if (this.isFormValid()) {
      this.handoffRequired.set(true);
      this.openValidatedMessageModal();
    } else {
      queueMicrotask(() => this.focusFirstInvalidField());
    }
  }

  showError(field: keyof ContactForm): boolean {
    const currentField = this.form()[field];
    return currentField.touched && !!currentField.error;
  }

  openMessageModal(): void {
    this.messageModalService.openModal();
  }

  openValidatedMessageModal(): void {
    this.messageModalService.openModal(this.buildMessageDraft());
  }

  errorId(field: keyof ContactForm): string {
    return `contact-${field}-error`;
  }

  contactKey(mainKey: string, expressKey = mainKey): string {
    return this.isExpress() ? expressKey : mainKey;
  }

  private validateField(field: keyof ContactForm, value: string): string {
    switch (field) {
      case 'fullName':
        if (!value.trim()) return 'contact.form.errors.fullNameRequired';
        if (value.trim().length < 2) return 'contact.form.errors.fullNameLength';
        return '';
      case 'phone':
        if (!value.trim()) return 'contact.form.errors.phoneRequired';
        if (!/^[+]?\d[\d\s().-]{6,}$/.test(value.trim())) return 'contact.form.errors.phoneInvalid';
        return '';
      case 'email':
        if (!value.trim()) return 'contact.form.errors.emailRequired';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'contact.form.errors.emailInvalid';
        return '';
      case 'origin':
        return value.trim()
          ? ''
          : this.contactKey(
              'contact.form.errors.originRequired',
              'express.contact.form.errors.originRequired',
            );
      case 'destination':
        return value.trim()
          ? ''
          : this.contactKey(
              'contact.form.errors.destinationRequired',
              'express.contact.form.errors.destinationRequired',
            );
      case 'cargoType':
        return value
          ? ''
          : this.contactKey(
              'contact.form.errors.cargoTypeRequired',
              'express.contact.form.errors.cargoTypeRequired',
            );
      case 'notes':
        return value.length <= 500 ? '' : 'contact.form.errors.notesLength';
      default:
        return '';
    }
  }

  private buildMessageDraft(): string {
    const current = this.form();
    const line = (labelKey: string, value: string) =>
      `${this.translationService.instant(labelKey)}: ${value}`;
    const lines = [
      this.translationService.instant(
        this.contactKey('contact.form.message.intro', 'express.contact.form.message.intro'),
      ),
      line('contact.form.fullName', current.fullName.value),
      line('contact.form.phone', current.phone.value),
      line('contact.form.email', current.email.value),
      line(
        this.contactKey('contact.form.origin', 'express.contact.form.origin'),
        current.origin.value,
      ),
      line(
        this.contactKey('contact.form.destination', 'express.contact.form.destination'),
        current.destination.value,
      ),
      line(
        this.contactKey('contact.form.cargoType', 'express.contact.form.cargoType'),
        this.getCargoLabel(current.cargoType.value),
      ),
    ];

    if (current.notes.value.trim()) {
      lines.push(
        line(
          this.contactKey('contact.form.notes', 'express.contact.form.notes'),
          current.notes.value.trim(),
        ),
      );
    }

    return lines.join('\n');
  }

  private getCargoLabel(value: string): string {
    const option = this.cargoOptions().find((item) => item.value === value);
    return option ? this.translationService.instant(option.labelKey) : value;
  }

  private focusFirstInvalidField(): void {
    const invalidField = (Object.keys(this.form()) as (keyof ContactForm)[]).find(
      (field) => this.showError(field),
    );
    if (invalidField) {
      this.document.getElementById(invalidField)?.focus();
    }
  }
}
