import { Component, signal, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { MessageModalService } from '../../services/message-modal.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './home.html',
})
export class HomeComponent {
  private messageModalService = inject(MessageModalService);
  private router = inject(Router);

  formData = signal({
    facilityName: '',
    contactName: '',
    phone: '',
    transportType: 'Laboratory Specimens',
  });

  transportTypes = [
    { value: 'Laboratory Specimens', labelKey: 'home.certified.form.transportOptions.specimens' },
    { value: 'Pharmaceutical Products', labelKey: 'home.certified.form.transportOptions.pharmacy' },
    { value: 'Medical Equipment', labelKey: 'home.certified.form.transportOptions.equipment' },
    { value: 'Medical Supplies', labelKey: 'home.certified.form.transportOptions.supplies' },
  ];

  /**
   * Open the message method selection modal
   */
  openMessageModal(): void {
    this.messageModalService.openModal();
  }

  updateFormField(field: keyof ReturnType<typeof this.formData>, value: string): void {
    this.formData.update((current) => ({ ...current, [field]: value }));
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const data = this.formData();
    this.router.navigate(['/contact'], {
      queryParams: {
        origin: data.facilityName,
        fullName: data.contactName,
        phone: data.phone,
        cargoType: data.transportType,
      },
    });
  }
}
