import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import enTranslations from '../../../src/assets/i18n/en.json';
import esTranslations from '../../../src/assets/i18n/es.json';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private currentLanguage$ = new BehaviorSubject<string>('en');
  private translations: { [key: string]: any } = enTranslations;
  private defaultLanguage = 'en';
  private langData: { [key: string]: any } = {
    en: enTranslations,
    es: esTranslations
  };

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    // localStorage is unavailable during server-side rendering/prerender
    const stored = (this.isBrowser && localStorage.getItem('lang')) || this.defaultLanguage;
    this.use(stored);
  }

  use(lang: string): void {
    this.translations = this.langData[lang] || this.langData[this.defaultLanguage];
    this.currentLanguage$.next(lang);
    if (this.isBrowser) {
      localStorage.setItem('lang', lang);
    }
  }

  getCurrentLanguage(): string {
    return this.currentLanguage$.value;
  }

  getCurrentLanguage$(): Observable<string> {
    return this.currentLanguage$.asObservable();
  }

  get(key: string, defaultValue: string = key): string {
    const keys = key.split('.');
    let value: any = this.translations;

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        return defaultValue;
      }
    }

    return typeof value === 'string' ? value : defaultValue;
  }

  instant(key: string): string {
    return this.get(key);
  }
}
