import {
  SEO_SITES,
  buildAbsoluteUrl,
  normalizeRoutePath,
  resolveSeoSite,
} from './seo.service';

describe('SEO URL helpers', () => {
  it('resolves Express from explicit route metadata', () => {
    expect(resolveSeoSite('express', '/contact')).toBe('express');
  });

  it('infers Express from the router URL when metadata is absent', () => {
    expect(resolveSeoSite(undefined, '/express/services/sameDay?lang=en')).toBe('express');
    expect(resolveSeoSite(undefined, '/services')).toBe('main');
  });

  it('removes query strings and fragments from canonical paths', () => {
    expect(normalizeRoutePath('/express/services?lang=es#details')).toBe('/express/services');
    expect(normalizeRoutePath('')).toBe('/');
  });

  it('builds canonical URLs with the correct production domain', () => {
    expect(buildAbsoluteUrl(SEO_SITES.main.origin, '/contact')).toBe(
      'https://www.vitalinkcouriers.com/contact',
    );
    expect(buildAbsoluteUrl(SEO_SITES.express.origin, '/express/contact')).toBe(
      'https://express.vitalinkcouriers.com/express/contact',
    );
  });
});
