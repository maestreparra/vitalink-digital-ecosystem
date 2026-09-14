import { Pipe, PipeTransform, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private subscription?: Subscription;

  constructor(
    private translationService: TranslationService,
    private cdr: ChangeDetectorRef
  ) {}

  transform(key: string, defaultValue?: string): string {
    if (!key) {
      return defaultValue || key;
    }

    if (!this.subscription) {
      this.subscription = this.translationService.getCurrentLanguage$().subscribe(() => {
        this.cdr.markForCheck();
      });
    }

    return this.translationService.instant(key) || defaultValue || key;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
