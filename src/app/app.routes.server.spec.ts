import { RenderMode } from '@angular/ssr';
import { serverRoutes } from './app.routes.server';

describe('serverRoutes', () => {
  it('serves the Express landing page without a 404 status', () => {
    const route = serverRoutes.find((candidate) => candidate.path === 'express');

    expect(route).toBeDefined();
    expect(route?.renderMode).toBe(RenderMode.Prerender);
  });

  it('prerenders valid Express detail pages and returns 404 for unknown keys', () => {
    const validServiceRoute = serverRoutes.find(
      (candidate) => candidate.path === 'express/services/sameDay',
    );
    const validSectorRoute = serverRoutes.find(
      (candidate) => candidate.path === 'express/sectors/automobiles',
    );
    const serviceRoute = serverRoutes.find(
      (candidate) => candidate.path === 'express/services/:service',
    );
    const sectorRoute = serverRoutes.find(
      (candidate) => candidate.path === 'express/sectors/:sector',
    );

    expect(validServiceRoute?.renderMode).toBe(RenderMode.Prerender);
    expect(validSectorRoute?.renderMode).toBe(RenderMode.Prerender);
    expect(serviceRoute?.renderMode).toBe(RenderMode.Server);
    expect(sectorRoute?.renderMode).toBe(RenderMode.Server);
    expect(serviceRoute && 'status' in serviceRoute ? serviceRoute.status : undefined).toBe(404);
    expect(sectorRoute && 'status' in sectorRoute ? sectorRoute.status : undefined).toBe(404);
  });

  it('keeps the wildcard route as the final 404 handler', () => {
    const wildcard = serverRoutes.at(-1);
    const wildcardStatus = wildcard && 'status' in wildcard ? wildcard.status : undefined;

    expect(wildcard?.path).toBe('**');
    expect(wildcardStatus).toBe(404);
  });
});
