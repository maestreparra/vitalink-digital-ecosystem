import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { SiteDetectionService } from './site-detection.service';

@Component({ standalone: true, template: '' })
class BlankComponent {}

describe('SiteDetectionService', () => {
  let service: SiteDetectionService;
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: 'main-page', component: BlankComponent },
          { path: 'express', component: BlankComponent },
          { path: 'express/services/sameDay', component: BlankComponent },
        ]),
      ],
    });

    harness = await RouterTestingHarness.create();
    service = TestBed.inject(SiteDetectionService);
  });

  it('is false on a main route', async () => {
    await harness.navigateByUrl('/main-page');
    expect(service.isExpress()).toBeFalse();
  });

  it('is true on the Express root route', async () => {
    await harness.navigateByUrl('/express');
    expect(service.isExpress()).toBeTrue();
  });

  it('is true on a nested Express route', async () => {
    await harness.navigateByUrl('/express/services/sameDay');
    expect(service.isExpress()).toBeTrue();
  });

  it('updates when navigating between product surfaces', async () => {
    await harness.navigateByUrl('/main-page');
    expect(service.isExpress()).toBeFalse();

    await harness.navigateByUrl('/express');
    expect(service.isExpress()).toBeTrue();

    await harness.navigateByUrl('/main-page');
    expect(service.isExpress()).toBeFalse();
  });
});
