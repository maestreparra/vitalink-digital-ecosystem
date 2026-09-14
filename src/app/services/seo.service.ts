import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { TranslationService } from './translation.service';

interface SeoRouteData {
  titleKey?: string;
  descriptionKey?: string;
  keywordsKey?: string;
  canonicalPath?: string;
  ogImage?: string;
  noindex?: boolean;
  site?: SeoSite;
}

export type SeoSite = 'main' | 'express';

interface SeoSiteConfig {
  origin: string;
  siteName: string;
}

export const SEO_SITES: Record<SeoSite, SeoSiteConfig> = {
  main: {
    origin: 'https://www.vitalinkcouriers.com',
    siteName: 'VitaLink Courier LLC',
  },
  express: {
    origin: 'https://express.vitalinkcouriers.com',
    siteName: 'VitaLink Express',
  },
};

export function resolveSeoSite(configuredSite: SeoSite | undefined, routerUrl: string): SeoSite {
  if (configuredSite) {
    return configuredSite;
  }

  return routerUrl.split(/[?#]/, 1)[0].startsWith('/express') ? 'express' : 'main';
}

export function normalizeRoutePath(routerUrl: string): string {
  return routerUrl.split(/[?#]/, 1)[0] || '/';
}

export function buildAbsoluteUrl(origin: string, path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return new URL(normalizedPath, origin).href;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);
  private document = inject(DOCUMENT);
  private translationService = inject(TranslationService);
  private initialized = false;

  init(): void {
    if (this.initialized) {
      return;
    }

    this.initialized = true;

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.applySeo());

    this.translationService.getCurrentLanguage$().subscribe(() => this.applySeo());

    this.applySeo();
  }

  private applySeo(): void {
    const data = this.getDeepestRouteData();
    const lang = this.translationService.getCurrentLanguage();
    const titleKey = data?.titleKey ?? 'seo.home.title';
    const descriptionKey = data?.descriptionKey ?? 'seo.home.description';
    const keywordsKey = data?.keywordsKey ?? 'seo.home.keywords';
    const site = resolveSeoSite(data?.site, this.router.url);
    const siteConfig = SEO_SITES[site];
    const canonicalPath = data?.canonicalPath ?? normalizeRoutePath(this.router.url);
    const ogImage = data?.ogImage ?? '/assets/images/og-home.jpg';

    const titleValue = this.translationService.instant(titleKey);
    const descriptionValue = this.translationService.instant(descriptionKey);
    const keywordsValue = this.translationService.instant(keywordsKey);
    const canonicalUrl = buildAbsoluteUrl(siteConfig.origin, canonicalPath);
    const ogImageUrl = buildAbsoluteUrl(siteConfig.origin, ogImage);
    const siteName = siteConfig.siteName;

    this.title.setTitle(titleValue);
    this.document.documentElement.lang = lang;

    this.meta.updateTag({ name: 'description', content: descriptionValue });
    this.meta.updateTag({ name: 'keywords', content: keywordsValue });
    this.meta.updateTag({
      name: 'robots',
      content: data?.noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    });

    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: siteName });
    this.meta.updateTag({ property: 'og:title', content: titleValue });
    this.meta.updateTag({ property: 'og:description', content: descriptionValue });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:image', content: ogImageUrl });
    this.meta.updateTag({ property: 'og:locale', content: lang === 'es' ? 'es_ES' : 'en_US' });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: titleValue });
    this.meta.updateTag({ name: 'twitter:description', content: descriptionValue });
    this.meta.updateTag({ name: 'twitter:image', content: ogImageUrl });

    this.updateCanonicalLink(canonicalUrl);
    this.updateStructuredData(siteName, siteConfig.origin, canonicalUrl, descriptionValue, lang, site);
  }

  private getDeepestRouteData(): SeoRouteData | undefined {
    let current: ActivatedRoute | null = this.router.routerState.root;

    while (current?.firstChild) {
      current = current.firstChild;
    }

    return current?.snapshot.data['seo'] as SeoRouteData | undefined;
  }

  private updateCanonicalLink(canonicalUrl: string): void {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }

    link.href = canonicalUrl;
  }

  private updateStructuredData(
    siteName: string,
    siteOrigin: string,
    canonicalUrl: string,
    description: string,
    lang: string,
    site: SeoSite,
  ): void {
    const scriptId = 'vitalink-jsonld';
    const existing = this.document.getElementById(scriptId);
    const orgPayload = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'LocalBusiness',
          '@id': `${siteOrigin}/#business`,
          name: siteName,
          url: siteOrigin,
          description,
          telephone: '+1-727-947-2309',
          email: 'roncordero@vitalinkcouriers.com',
          image: `${siteOrigin}/assets/images/og-home.jpg`,
          priceRange: '$$',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Tarpon Springs',
            addressRegion: 'FL',
            addressCountry: 'US',
          },
          areaServed: ['Tarpon Springs, FL', 'Greater Tampa Bay, FL', 'Pinellas County, FL', 'Hillsborough County, FL'],
          knowsAbout: site === 'express'
            ? [
                'Same-day delivery',
                'Regional delivery',
                'Specialized cargo delivery',
                'Document delivery',
                'E-commerce delivery',
              ]
            : [
                'Expedited medical courier',
                'Specimen transport',
                'Pharmacy delivery',
                'STAT medical delivery',
                'Healthcare logistics',
              ],
        },
        {
          '@type': 'WebSite',
          name: siteName,
          url: siteOrigin,
          description,
          publisher: { '@id': `${siteOrigin}/#business` },
          inLanguage: [lang, lang === 'es' ? 'en' : 'es'],
        },
      ],
    };

    const script = (existing as HTMLScriptElement | null) ?? this.document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(orgPayload);

    if (!existing) {
      this.document.head.appendChild(script);
    }
  }
}
