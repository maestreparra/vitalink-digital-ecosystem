import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

const EXPRESS_HOSTNAME = 'express.vitalinkcouriers.com';

@Injectable({
  providedIn: 'root'
})
export class SiteDetectionService {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private router = inject(Router);
  isExpress = signal(false);

  constructor() {
    this.updateSite(this.router.url);

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.updateSite(event.urlAfterRedirects));
  }

  private updateSite(url: string): void {
    const isExpressHost = this.isBrowser && window.location.hostname === EXPRESS_HOSTNAME;
    const routePath = url.split(/[?#]/, 1)[0];
    const isExpressRoute = routePath === '/express' || routePath.startsWith('/express/');
    this.isExpress.set(isExpressHost || isExpressRoute);
  }
}
