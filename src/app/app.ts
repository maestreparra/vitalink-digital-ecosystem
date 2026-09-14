import { Component, OnInit, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TranslationService } from './services/translation.service';
import { SeoService } from './services/seo.service';
import { HeaderComponent } from './components/header/header';
import { FooterComponent } from './components/footer/footer';
import { LanguageModalComponent } from './components/language-modal/language-modal';
import {
  MessageMethod,
  SelectMessageModalComponent,
} from './components/select-message-modal/select-message-modal';
import { MessageModalService } from './services/message-modal.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    LanguageModalComponent,
    SelectMessageModalComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  readonly messageModalService = inject(MessageModalService);
  showLanguageModal = signal(false);
  isAnyModalOpen = computed(
    () => this.showLanguageModal() || this.messageModalService.showModal(),
  );

  // Modal display timeout in minutes (1-3 minutes before showing again)
  private readonly MODAL_TIMEOUT_MINUTES = 3; // 3 minutes

  constructor(
    private translationService: TranslationService,
    private seoService: SeoService,
  ) {}

  ngOnInit(): void {
    this.initializeLanguageModal();
    this.seoService.init();
  }

  /**
   * Initialize language modal visibility based on:
   * 1. First time visiting (no lang preference)
   * 2. Time since last modal closure (3 minutes)
   */
  private initializeLanguageModal(): void {
    // Skip during server-side rendering/prerender: no localStorage, and the
    // modal must not be baked into the prerendered HTML Google indexes.
    if (!this.isBrowser) {
      return;
    }

    const lastModalClosureTime = localStorage.getItem('lastModalClosureTime');
    const currentTime = Date.now();

    if (!lastModalClosureTime) {
      // First time visiting - show modal
      this.showLanguageModal.set(true);
    } else {
      // Check if enough time has passed since last closure
      const timeSinceLastClosure = currentTime - parseInt(lastModalClosureTime, 10);
      const timeoutMs = this.MODAL_TIMEOUT_MINUTES * 60 * 1000; // Convert to milliseconds

      if (timeSinceLastClosure >= timeoutMs) {
        // Enough time has passed - show modal again
        this.showLanguageModal.set(true);
      }
    }
  }

  /**
   * Handle language selection from modal
   * @param langCode Language code ('en' or 'es')
   */
  onLanguageSelected(langCode: string): void {
    this.translationService.use(langCode);
    this.closeLanguageModal();
  }

  /**
   * Close the language modal and save the current timestamp
   */
  private closeLanguageModal(): void {
    this.showLanguageModal.set(false);
    localStorage.setItem('lastModalClosureTime', Date.now().toString());
  }

  onMessageMethodSelected(method: MessageMethod): void {
    this.messageModalService.handleMethodSelection(method);
  }
}
