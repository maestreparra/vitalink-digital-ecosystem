import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-placeholder',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="min-h-[60vh] flex items-center justify-center py-20 px-4">
      <div class="text-center max-w-md">
        <div class="w-16 h-16 bg-light-gray rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7V12C2 16.5 4.84 20.74 9 21.93L12 22.93L15 21.93C19.16 20.74 22 16.5 22 12V7L12 2Z" stroke="#0A2F44" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h1 class="font-headline font-bold text-navy text-2xl md:text-3xl mb-4">Coming Soon</h1>
        <p class="font-body text-text-secondary text-base leading-relaxed mb-8">
          This page is currently being developed. Continue prompting to fill in this page's content.
        </p>
        <a routerLink="/" class="inline-flex items-center gap-2 bg-brand-red text-white font-body font-semibold text-base px-6 py-3 rounded-sm hover:bg-brand-red-dark transition-colors">
          ← Back to Home
        </a>
      </div>
    </section>
  `,
})
export class PlaceholderComponent {}
