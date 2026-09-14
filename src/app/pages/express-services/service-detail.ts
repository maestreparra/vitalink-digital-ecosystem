import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [CommonModule, TranslatePipe, RouterLink],
  template: `
    <section class="relative overflow-hidden min-h-[400px] md:min-h-[500px] flex items-center">
      <img
        [src]="heroImage"
        alt="VitaLink Express service"
        class="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/75 to-navy/50"></div>

      <div class="relative z-10 w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div class="max-w-[640px] flex flex-col gap-5">
          <h1 class="font-headline font-bold text-white text-4xl md:text-5xl leading-[1.1]">
            {{ 'express.services.items.' + serviceKey | translate }}
          </h1>

          <p class="font-body text-white/90 text-base md:text-lg leading-relaxed max-w-[560px]">
            {{ 'express.services.items.' + serviceKey + '_desc' | translate }}
          </p>
        </div>
      </div>
    </section>

    <section class="bg-white py-6 md:py-8 border-b border-border-gray">
      <div class="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap gap-4">
          <a
            routerLink="/express"
            class="flex items-center justify-center gap-2 bg-navy text-white font-body font-semibold text-base px-6 py-3 rounded-sm shadow-sm hover:opacity-90 transition-opacity"
          >{{ 'express.services.backHome' | translate }}</a>

          <a
            routerLink="/express/services"
            class="flex items-center justify-center font-body font-semibold text-base px-6 py-3 rounded-sm border border-border-gray text-navy hover:bg-light-gray transition-colors"
          >{{ 'express.services.backServices' | translate }}</a>
        </div>
      </div>
    </section>

    <section class="bg-white py-16 md:py-20">
      <div class="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <p class="font-body text-text-secondary text-base md:text-lg leading-relaxed max-w-[800px] mb-12">
          {{ 'express.services.detail.' + serviceKey + '.intro' | translate }}
        </p>

        <h2 class="font-headline font-bold text-navy text-2xl md:text-[32px] leading-tight mb-6">
          {{ 'express.services.detail.' + serviceKey + '.features' | translate }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          @for (feature of features; track feature) {
            <div class="border border-lavender rounded-sm p-6">
              <h3 class="font-headline font-bold text-navy text-lg mb-2">{{ feature }}</h3>
              <p class="font-body text-text-secondary text-sm">
                {{ 'express.services.detail.' + serviceKey + '.feature_' + feature | translate }}
              </p>
            </div>
          }
        </div>
      </div>
    </section>

    <section class="bg-light-gray py-12 md:py-16">
      <div class="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="font-headline font-bold text-navy text-xl md:text-2xl mb-4">
          {{ 'express.services.cta.title' | translate }}
        </h2>
        <a routerLink="/express/contact" class="inline-block px-8 py-3 bg-brand-red text-white font-semibold rounded-sm hover:bg-brand-red-dark transition-colors">
          {{ 'express.services.cta.button' | translate }}
        </a>
      </div>
    </section>
  `
})
export class ServiceDetailComponent implements OnInit {
  serviceKey: string = '';
  features: string[] = [];
  heroImage: string = '';

  serviceFeatures = {
    sameDay: ['Real-Time Coordination', 'Flexible Pickup Windows', 'Point-to-Point Routing', 'Proof of Delivery'],
    regional: ['Scheduled Routes', 'Multi-Stop Efficiency', 'Regional Coverage', 'Dedicated Support'],
    specialized: ['Custom Route Planning', 'Oversized & Irregular Cargo', 'Careful Handling', 'Flexible Scheduling'],
    documents: ['Chain-of-Custody Care', 'Time-Sensitive Filings', 'Confidential Handling', 'Delivery Confirmation'],
    ecommerce: ['Last-Mile Delivery', 'Scalable Support', 'Order Tracking', 'Return Pickups']
  };

  serviceImages = {
    sameDay: '/assets/images/header-express-services-sameday.jpg',
    regional: '/assets/images/header-express-services-regional.jpg',
    specialized: '/assets/images/header-express-services-specialized.jpg',
    documents: '/assets/images/header-express-services-documents.jpg',
    ecommerce: '/assets/images/header-express-services-ecommerce.jpg'
  };

  constructor(
    private route: ActivatedRoute,
    private translate: TranslationService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.serviceKey = data['contentKey'] || this.route.snapshot.paramMap.get('service') || 'sameDay';
      this.features = this.serviceFeatures[this.serviceKey as keyof typeof this.serviceFeatures] || [];
      this.heroImage = this.serviceImages[this.serviceKey as keyof typeof this.serviceImages] || '/assets/images/header-express-home.jpg';
    });
  }
}
