import { Component, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { FooterComponent } from './components/footer/footer';
import { HeaderComponent } from './components/header/header';
import { ExpressCodesComponent } from './pages/express-codes/express-codes';
import { ContactComponent } from './pages/contact/contact';
import { ExpressHomeComponent } from './pages/express-home/express-home';
import { SectorDetailComponent } from './pages/express-sectors/sector-detail';
import { ExpressServicesComponent } from './pages/express-services/express-services';
import { ServiceDetailComponent } from './pages/express-services/service-detail';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@Component({ standalone: true, template: '' })
class BlankComponent {}

function hrefs(fixture: ComponentFixture<unknown>): string[] {
  const element = fixture.nativeElement as HTMLElement;
  return Array.from(element.querySelectorAll<HTMLAnchorElement>('a'))
    .map((link) => link.getAttribute('href'))
    .filter((href): href is string => href !== null);
}

describe('Express rendered navigation', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        FooterComponent,
        ExpressCodesComponent,
        ContactComponent,
        ExpressHomeComponent,
        SectorDetailComponent,
        ExpressServicesComponent,
        ServiceDetailComponent,
        NotFoundComponent,
      ],
      providers: [
        provideRouter([
          { path: 'express', component: BlankComponent },
          { path: '**', component: BlankComponent },
        ]),
      ],
    }).compileComponents();
  });

  async function renderOnExpress<T>(component: Type<T>): Promise<ComponentFixture<T>> {
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/express');
    const fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    return fixture;
  }

  it('renders domain-safe shared header links for Express', async () => {
    const fixture = await renderOnExpress(HeaderComponent);
    const links = hrefs(fixture);

    expect(links).toContain('/express');
    expect(links).toContain('/express/services');
    expect(links).toContain('/express/contact');
    expect(links).toContain('https://www.vitalinkcouriers.com/about');
    expect(links.filter((href) => href === 'https://www.vitalinkcouriers.com/about').length).toBe(1);
    expect(links).not.toContain('/about');
    expect(links).not.toContain('/contact');
  });

  it('keeps the shared footer home link inside Express', async () => {
    const fixture = await renderOnExpress(FooterComponent);
    expect(hrefs(fixture)).toContain('/express');
  });

  it('renders scoped sector and contact links on the Express home page', async () => {
    const fixture = await renderOnExpress(ExpressHomeComponent);
    const links = hrefs(fixture);

    expect(links).toContain('/express/contact');
    expect(links).toContain('/express/sectors/automobiles');
    expect(links).toContain('/express/sectors/agriculture');
    expect(links).toContain('/express/sectors/food-beverage');
    expect(links).toContain('/express/sectors/machinery');
    expect(links.some((href) => href.startsWith('/sectors/'))).toBeFalse();
  });

  it('keeps Express calls to action inside Express', async () => {
    const servicesFixture = await renderOnExpress(ExpressServicesComponent);
    const codesFixture = await renderOnExpress(ExpressCodesComponent);
    const serviceFixture = await renderOnExpress(ServiceDetailComponent);
    const sectorFixture = await renderOnExpress(SectorDetailComponent);

    expect(hrefs(servicesFixture)).toContain('/express/contact');
    expect(hrefs(codesFixture)).toContain('/express/contact');
    expect(hrefs(serviceFixture)).toContain('/express/contact');
    expect(hrefs(serviceFixture)).toContain('/express/services');
    expect(hrefs(sectorFixture)).toContain('/express/contact');
    expect(hrefs(sectorFixture)).toContain('/express/services');
  });

  it('returns Express users to the Express home from a not-found page', async () => {
    const fixture = await renderOnExpress(NotFoundComponent);
    expect(hrefs(fixture)).toContain('/express');
  });

  it('renders an Express-specific quote intake without medical cargo options', async () => {
    const fixture = await renderOnExpress(ContactComponent);
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    const optionValues = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLOptionElement>('option'),
    ).map((option) => option.value);

    expect(text).toContain('Contact VitaLink Express');
    expect(text).toContain('Express Courier Quote Request');
    expect(text).not.toContain('expedited medical courier needs');
    expect(optionValues).toContain('Same-Day Delivery');
    expect(optionValues).toContain('Automobiles');
    expect(optionValues).not.toContain('Medical Supplies');
  });
});
