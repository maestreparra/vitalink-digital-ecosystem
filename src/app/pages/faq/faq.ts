import { Component, signal, computed, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TranslationService } from '../../services/translation.service';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  title: string;
  items: FaqItem[];
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './faq.html',
})
export class FaqComponent implements OnDestroy, OnInit {
  private document = inject(DOCUMENT);
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;

  searchQuery = signal('');
  openItems = signal<Set<string>>(new Set());

  // Store categories as a signal so it updates when language changes
  categoriesSignal = signal<FaqCategory[]>([]);

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    // Initialize categories with current language
    this.updateCategories();

    // Update categories whenever language changes
    this.translationService.getCurrentLanguage$().subscribe(() => {
      this.updateCategories();
    });
  }

  /**
   * Build FAQ categories dynamically from translation service
   */
  private updateCategories(): void {
    const categoryIds = ['about', 'services', 'compliance', 'support'];
    const categories: FaqCategory[] = categoryIds.map(id => ({
      id,
      title: this.translationService.instant(`faq.categories.${id}.title`),
      items: [
        {
          id: `${id}-1`,
          question: this.translationService.instant(`faq.categories.${id}.question1`),
          answer: this.translationService.instant(`faq.categories.${id}.answer1`)
        },
        {
          id: `${id}-2`,
          question: this.translationService.instant(`faq.categories.${id}.question2`),
          answer: this.translationService.instant(`faq.categories.${id}.answer2`)
        }
      ]
    }));

    this.categoriesSignal.set(categories);
    this.updateFaqStructuredData(categories);
  }

  /**
   * Inject FAQPage JSON-LD so the questions are eligible for
   * Google rich results and AI Overviews.
   */
  private updateFaqStructuredData(categories: FaqCategory[]): void {
    const scriptId = 'vitalink-faq-jsonld';
    const payload = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: categories.flatMap(cat =>
        cat.items.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        }))
      ),
    };

    const existing = this.document.getElementById(scriptId) as HTMLScriptElement | null;
    const script = existing ?? this.document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(payload);

    if (!existing) {
      this.document.head.appendChild(script);
    }
  }

  /**
   * Get categories (uses signal for reactivity)
   */
  get categories(): FaqCategory[] {
    return this.categoriesSignal();
  }

  filteredCategories = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.categories;
    return this.categories
      .map(cat => ({
        ...cat,
        items: cat.items.filter(
          item =>
            item.question.toLowerCase().includes(q) ||
            item.answer.toLowerCase().includes(q)
        )
      }))
      .filter(cat => cat.items.length > 0);
  });

  get aboutCat() { return this.filteredCategories().find(c => c.id === 'about'); }
  get servicesCat() { return this.filteredCategories().find(c => c.id === 'services'); }
  get complianceCat() { return this.filteredCategories().find(c => c.id === 'compliance'); }
  get supportCat() { return this.filteredCategories().find(c => c.id === 'support'); }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => this.searchQuery.set(value), 300);
  }

  toggleItem(id: string) {
    const next = new Set(this.openItems());
    next.has(id) ? next.delete(id) : next.add(id);
    this.openItems.set(next);
  }

  isOpen(id: string) { return this.openItems().has(id); }

  onKeydown(event: KeyboardEvent, item: FaqItem, cat: FaqCategory) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleItem(item.id);
      return;
    }
    const ids = cat.items.map(i => i.id);
    const idx = ids.indexOf(item.id);
    if (event.key === 'ArrowDown' && idx < ids.length - 1) {
      event.preventDefault();
      document.getElementById(`faq-btn-${ids[idx + 1]}`)?.focus();
    }
    if (event.key === 'ArrowUp' && idx > 0) {
      event.preventDefault();
      document.getElementById(`faq-btn-${ids[idx - 1]}`)?.focus();
    }
  }

  ngOnDestroy() {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    // Remove the FAQ schema when leaving the page so it doesn't leak onto other routes
    this.document.getElementById('vitalink-faq-jsonld')?.remove();
  }
}
