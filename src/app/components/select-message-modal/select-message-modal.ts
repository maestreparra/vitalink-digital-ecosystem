import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { TranslatePipe } from '../../pipes/translate.pipe';

export type MessageMethod = 'sms' | 'whatsapp';

@Component({
  selector: 'app-select-message-modal',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './select-message-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectMessageModalComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() showModal = false;
  @Output() methodSelected = new EventEmitter<MessageMethod>();
  @Output() closeModalEvent = new EventEmitter<void>();
  @ViewChild('dialogPanel') dialogPanel?: ElementRef<HTMLElement>;
  @ViewChild('closeButton') closeButton?: ElementRef<HTMLButtonElement>;

  selectedMethod = signal<MessageMethod | null>(null);
  private document = inject(DOCUMENT);
  private previouslyFocusedElement: HTMLElement | null = null;
  private originalBodyOverflow = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['showModal']) {
      return;
    }

    if (this.showModal) {
      this.activateDialog();
    } else {
      this.deactivateDialog();
    }
  }

  ngAfterViewInit(): void {
    if (this.showModal) {
      this.focusInitialControl();
    }
  }

  ngOnDestroy(): void {
    this.deactivateDialog();
  }

  selectMethod(method: MessageMethod): void {
    this.selectedMethod.set(method);
    this.methodSelected.emit(method);
  }

  closeModal(): void {
    this.selectedMethod.set(null);
    this.closeModalEvent.emit();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
    if (!this.showModal) {
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeModal();
      return;
    }

    if (event.key === 'Tab') {
      this.trapFocus(event);
    }
  }

  private activateDialog(): void {
    this.previouslyFocusedElement = this.document.activeElement as HTMLElement | null;
    this.originalBodyOverflow = this.document.body.style.overflow;
    this.document.body.style.overflow = 'hidden';
    queueMicrotask(() => this.focusInitialControl());
  }

  private deactivateDialog(): void {
    this.document.body.style.overflow = this.originalBodyOverflow;
    const focusTarget = this.previouslyFocusedElement;
    this.previouslyFocusedElement = null;
    queueMicrotask(() => focusTarget?.focus());
  }

  private focusInitialControl(): void {
    this.closeButton?.nativeElement.focus();
  }

  private trapFocus(event: KeyboardEvent): void {
    const panel = this.dialogPanel?.nativeElement;
    if (!panel) {
      return;
    }

    const controls = Array.from(
      panel.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );
    if (!controls.length) {
      event.preventDefault();
      panel.focus();
      return;
    }

    const first = controls[0];
    const last = controls[controls.length - 1];
    const active = this.document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }
}
