import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-sector-detail',
  standalone: true,
  imports: [CommonModule, TranslatePipe, RouterLink],
  template: `
    <section class="relative overflow-hidden min-h-[400px] md:min-h-[500px] flex items-center">
      <img
        [src]="heroImage"
        alt="VitaLink Express sector"
        class="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/75 to-navy/50"></div>

      <div class="relative z-10 w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div class="max-w-[640px] flex flex-col gap-5">
          <h1 class="font-headline font-bold text-white text-4xl md:text-5xl leading-[1.1]">
            {{ 'express.sectors.' + sectorKey + '.title' | translate }}
          </h1>

          <p class="font-body text-white/90 text-base md:text-lg leading-relaxed max-w-[560px]">
            {{ 'express.sectors.' + sectorKey + '.description' | translate }}
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
          >{{ 'express.sectors.backHome' | translate }}</a>

          <a
            routerLink="/express/services"
            class="flex items-center justify-center font-body font-semibold text-base px-6 py-3 rounded-sm border border-border-gray text-navy hover:bg-light-gray transition-colors"
          >{{ 'express.sectors.goServices' | translate }}</a>
        </div>
      </div>
    </section>

    <section class="bg-white py-16 md:py-20">
      <div class="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <p class="font-body text-text-secondary text-base md:text-lg leading-relaxed max-w-[800px] mb-12">
          {{ 'express.sectors.' + sectorKey + '.intro' | translate }}
        </p>

        <h2 class="font-headline font-bold text-navy text-2xl md:text-[32px] leading-tight mb-6">
          {{ 'express.sectors.' + sectorKey + '.services' | translate }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          @for (service of services; track service) {
            <div class="border border-lavender rounded-sm p-6">
              <h3 class="font-headline font-bold text-navy text-lg mb-2">{{ service }}</h3>
              <p class="font-body text-text-secondary text-sm">
                {{ 'express.sectors.' + sectorKey + '.service_' + service | translate }}
              </p>
            </div>
          }
        </div>
      </div>
    </section>

    <section class="bg-light-gray py-12 md:py-16">
      <div class="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="font-headline font-bold text-navy text-xl md:text-2xl mb-4">
          {{ 'express.sectors.ready' | translate }}
        </h2>
        <a routerLink="/express/contact" class="inline-block px-8 py-3 bg-brand-red text-white font-semibold rounded-sm hover:bg-brand-red-dark transition-colors">
          {{ 'express.sectors.contact_cta' | translate }}
        </a>
      </div>
    </section>
  `
})
export class SectorDetailComponent implements OnInit {
  sectorKey: string = '';
  services: string[] = [];
  heroImage: string = '';

  sectors = {
    automobiles: ['Auto Parts', 'Vehicle Transport', 'Accessories', 'Inventory Logistics'],
    agriculture: ['Crop Delivery', 'Equipment Transport', 'Seed Distribution', 'Produce Logistics'],
    'food-beverage': ['Perishable Delivery', 'Temperature Control', 'Ingredient Distribution', 'Restaurant Supply'],
    machinery: ['Equipment Transport', 'Heavy Load', 'Industrial Delivery', 'Machinery Installation']
  };

  sectorImages = {
    automobiles: '/assets/images/header-express-sectors-automobile.jpg',
    agriculture: '/assets/images/header-express-sectors-agricultural.jpg',
    'food-beverage': '/assets/images/header-express-sectors-food.jpg',
    machinery: '/assets/images/header-express-sectors-heavy-machinery.jpg'
  };

  constructor(
    private route: ActivatedRoute,
    private translate: TranslationService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.sectorKey = data['contentKey'] || this.route.snapshot.paramMap.get('sector') || 'automobiles';
      this.services = this.sectors[this.sectorKey as keyof typeof this.sectors] || [];
      this.heroImage = this.sectorImages[this.sectorKey as keyof typeof this.sectorImages] || '/assets/images/header-express-home.jpg';
    });
  }
}
