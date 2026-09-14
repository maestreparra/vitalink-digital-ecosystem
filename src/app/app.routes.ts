import { Route, Routes } from '@angular/router';
import { expressDomainGuard } from './guards/express-domain.guard';

const EXPRESS_SERVICE_KEYS = ['sameDay', 'regional', 'specialized', 'documents', 'ecommerce'];
const EXPRESS_SECTOR_KEYS = ['automobiles', 'agriculture', 'food-beverage', 'machinery'];

function expressServiceRoute(serviceKey: string): Route {
  return {
    path: `services/${serviceKey}`,
    loadComponent: () =>
      import('./pages/express-services/service-detail').then(
        (module) => module.ServiceDetailComponent,
      ),
    data: {
      contentKey: serviceKey,
      seo: {
        titleKey: 'express.services.title',
        descriptionKey: 'express.services.description',
        keywordsKey: 'express.seo.keywords',
        canonicalPath: `/express/services/${serviceKey}`,
        site: 'express',
        ogImage: '/assets/images/og-home.jpg',
      },
    },
  };
}

function expressSectorRoute(sectorKey: string): Route {
  return {
    path: `sectors/${sectorKey}`,
    loadComponent: () =>
      import('./pages/express-sectors/sector-detail').then(
        (module) => module.SectorDetailComponent,
      ),
    data: {
      contentKey: sectorKey,
      seo: {
        titleKey: 'express.seo.sector.title',
        descriptionKey: 'express.seo.sector.description',
        keywordsKey: 'express.seo.sector.keywords',
        canonicalPath: `/express/sectors/${sectorKey}`,
        site: 'express',
        ogImage: '/assets/images/og-home.jpg',
      },
    },
  };
}

const expressNotFoundRoute: Route = {
  loadComponent: () =>
    import('./pages/not-found/not-found.component').then(
      (module) => module.NotFoundComponent,
    ),
  data: {
    seo: {
      titleKey: 'seo.notFound.title',
      descriptionKey: 'seo.notFound.description',
      keywordsKey: 'seo.notFound.keywords',
      canonicalPath: '/404',
      site: 'express',
      noindex: true,
    },
  },
};

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((module) => module.HomeComponent),
    canActivate: [expressDomainGuard],
    data: {
      seo: {
        titleKey: 'seo.home.title',
        descriptionKey: 'seo.home.description',
        keywordsKey: 'seo.home.keywords',
        canonicalPath: '/',
        ogImage: '/assets/images/og-home.jpg',
      },
    },
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((module) => module.AboutComponent),
    data: {
      seo: {
        titleKey: 'seo.about.title',
        descriptionKey: 'seo.about.description',
        keywordsKey: 'seo.about.keywords',
        canonicalPath: '/about',
        ogImage: '/assets/images/og-home.jpg',
      },
    },
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services').then((module) => module.ServicesComponent),
    data: {
      seo: {
        titleKey: 'seo.services.title',
        descriptionKey: 'seo.services.description',
        keywordsKey: 'seo.services.keywords',
        canonicalPath: '/services',
        ogImage: '/assets/images/og-home.jpg',
      },
    },
  },
  {
    path: 'sam-gov',
    loadComponent: () =>
      import('./pages/government-registration/government-registration').then(
        (module) => module.GovernmentRegistrationComponent,
      ),
    data: {
      seo: {
        titleKey: 'seo.samgov.title',
        descriptionKey: 'seo.samgov.description',
        keywordsKey: 'seo.samgov.keywords',
        canonicalPath: '/sam-gov',
        ogImage: '/assets/images/og-home.jpg',
      },
    },
  },
  {
    path: 'certifications',
    loadComponent: () =>
      import('./pages/general-services/general-services').then(
        (module) => module.GeneralServicesComponent,
      ),
    data: {
      seo: {
        titleKey: 'seo.certifications.title',
        descriptionKey: 'seo.certifications.description',
        keywordsKey: 'seo.certifications.keywords',
        canonicalPath: '/certifications',
        ogImage: '/assets/images/og-home.jpg',
      },
    },
  },
  {
    path: 'faq',
    loadComponent: () => import('./pages/faq/faq').then((module) => module.FaqComponent),
    data: {
      seo: {
        titleKey: 'seo.faq.title',
        descriptionKey: 'seo.faq.description',
        keywordsKey: 'seo.faq.keywords',
        canonicalPath: '/faq',
        ogImage: '/assets/images/og-home.jpg',
      },
    },
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then((module) => module.ContactComponent),
    data: {
      seo: {
        titleKey: 'seo.contact.title',
        descriptionKey: 'seo.contact.description',
        keywordsKey: 'seo.contact.keywords',
        canonicalPath: '/contact',
        ogImage: '/assets/images/og-home.jpg',
      },
    },
  },
  {
    path: 'express',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/express-home/express-home').then(
            (module) => module.ExpressHomeComponent,
          ),
        data: {
          seo: {
            titleKey: 'express.seo.title',
            descriptionKey: 'express.seo.description',
            keywordsKey: 'express.seo.keywords',
            canonicalPath: '/express',
            site: 'express',
            ogImage: '/assets/images/og-home.jpg',
          },
        },
      },
      {
        path: 'services',
        loadComponent: () =>
          import('./pages/express-services/express-services').then(
            (module) => module.ExpressServicesComponent,
          ),
        data: {
          seo: {
            titleKey: 'express.services.title',
            descriptionKey: 'express.services.description',
            keywordsKey: 'express.seo.keywords',
            canonicalPath: '/express/services',
            site: 'express',
            ogImage: '/assets/images/og-home.jpg',
          },
        },
      },
      ...EXPRESS_SERVICE_KEYS.map(expressServiceRoute),
      { path: 'services/:service', ...expressNotFoundRoute },
      {
        path: 'codes-certs',
        loadComponent: () =>
          import('./pages/express-codes/express-codes').then(
            (module) => module.ExpressCodesComponent,
          ),
        data: {
          seo: {
            titleKey: 'express.codes.title',
            descriptionKey: 'express.codes.description',
            keywordsKey: 'express.seo.keywords',
            canonicalPath: '/express/codes-certs',
            site: 'express',
            ogImage: '/assets/images/og-home.jpg',
          },
        },
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./pages/contact/contact').then((module) => module.ContactComponent),
        data: {
          seo: {
            titleKey: 'express.contact.title',
            descriptionKey: 'express.contact.description',
            keywordsKey: 'express.seo.keywords',
            canonicalPath: '/express/contact',
            site: 'express',
            ogImage: '/assets/images/og-home.jpg',
          },
        },
      },
      ...EXPRESS_SECTOR_KEYS.map(expressSectorRoute),
      { path: 'sectors/:sector', ...expressNotFoundRoute },
    ],
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./pages/placeholder/placeholder').then((module) => module.PlaceholderComponent),
    data: {
      seo: {
        titleKey: 'seo.blog.title',
        descriptionKey: 'seo.blog.description',
        keywordsKey: 'seo.blog.keywords',
        canonicalPath: '/blog',
        // Placeholder page: keep out of the index until real posts exist
        noindex: true,
      },
    },
  },
  {
    path: '404',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then((module) => module.NotFoundComponent),
    data: {
      seo: {
        titleKey: 'seo.notFound.title',
        descriptionKey: 'seo.notFound.description',
        keywordsKey: 'seo.notFound.keywords',
        canonicalPath: '/404',
        noindex: true,
      },
    },
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then((module) => module.NotFoundComponent),
    data: {
      seo: {
        titleKey: 'seo.notFound.title',
        descriptionKey: 'seo.notFound.description',
        keywordsKey: 'seo.notFound.keywords',
        canonicalPath: '/404',
        noindex: true,
      },
    },
  },
];
