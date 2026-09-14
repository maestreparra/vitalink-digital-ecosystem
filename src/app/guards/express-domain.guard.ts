import { Router, CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';

export const expressDomainGuard: CanActivateFn = (route, state) => {
  // Only redirect in browser, not during SSR
  if (typeof window === 'undefined') {
    return true;
  }

  const router = inject(Router);
  const hostname = window.location.hostname;

  if (hostname.includes('express.vitalinkcouriers.com') && state.url === '/') {
    return router.parseUrl('/express');
  }

  return true;
};
