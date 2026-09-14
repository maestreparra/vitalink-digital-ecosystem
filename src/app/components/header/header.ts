import { Component, signal, HostListener, ElementRef, inject, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { MessageModalService } from '../../services/message-modal.service';
import { SiteDetectionService } from '../../services/site-detection.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

interface NavLink {
  label: string;
  path: string;
  exact: boolean;
  external?: boolean;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './header.html',
})
export class HeaderComponent {
  mobileMenuOpen = signal(false);
  langMenuOpen = signal(false);

  private siteDetection = inject(SiteDetectionService);
  isExpress = this.siteDetection.isExpress;

  private medicalCertsLink: NavLink = { label: 'header.nav.samgovandcerts', path: '/sam-gov', exact: false };
  private expressCertsLink: NavLink = { label: 'header.nav.samandcerts', path: '/express/codes-certs', exact: false };

  private medicalNavLinks: NavLink[] = [
    this.medicalCertsLink,
    { label: 'header.nav.vitalinkexpress', path: 'https://express.vitalinkcouriers.com', exact: false, external: true },
    { label: 'header.nav.faq', path: '/faq', exact: false },
    { label: 'header.nav.blog', path: '/blog', exact: false },
    { label: 'header.nav.contact', path: '/contact', exact: false },
  ];

  private expressNavLinks: NavLink[] = [
    this.expressCertsLink,
    { label: 'header.nav.medical', path: 'https://www.vitalinkcouriers.com', exact: false, external: true },
    { label: 'header.nav.contact', path: '/express/contact', exact: false },
  ];

  private baseNavLinks = computed<NavLink[]>(() => [
    { label: 'header.nav.home', path: this.isExpress() ? '/express' : '/', exact: true },
    this.isExpress()
      ? { label: 'header.nav.about', path: 'https://www.vitalinkcouriers.com/about', exact: false, external: true }
      : { label: 'header.nav.about', path: '/about', exact: false },
    { label: 'header.nav.services', path: this.isExpress() ? '/express/services' : '/services', exact: false },
  ]);

  navLinks = computed<NavLink[]>(() => [
    ...this.baseNavLinks(),
    ...(this.isExpress() ? this.expressNavLinks : this.medicalNavLinks),
  ]);

  private messageModalService = inject(MessageModalService);

  constructor(private el: ElementRef, public translationService: TranslationService) {}

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
    if (this.mobileMenuOpen()) this.langMenuOpen.set(false);
  }

  toggleLangMenu(event: Event) {
    event.stopPropagation();
    this.langMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }

  useLanguage(lang: string) {
    this.translationService.use(lang);
    this.langMenuOpen.set(false);
  }

  /**
   * Open the message method selection modal from header
   */
  openMessageModal(): void {
    this.messageModalService.openModal();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.langMenuOpen.set(false);
    }
  }
}
