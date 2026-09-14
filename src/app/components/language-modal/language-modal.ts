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
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-language-modal',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './language-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageModalComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() showModal = false;
  @Output() languageSelected = new EventEmitter<string>();
  @ViewChild('dialogPanel') dialogPanel?: ElementRef<HTMLElement>;
  @ViewChild('closeButton') closeButton?: ElementRef<HTMLButtonElement>;
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

  /**
   * User selected a language from the modal
   * @param langCode Language code ('en' or 'es')
   */
  selectLanguage(langCode: 'en' | 'es'): void {
    this.languageSelected.emit(langCode);
  }

  /**
   * User closed modal without selecting language
   * Default to English
   */
  closeModal(): void {
    this.languageSelected.emit('en');
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
      panel.querySelectorAll<HTMLElement>('button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
    );
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
