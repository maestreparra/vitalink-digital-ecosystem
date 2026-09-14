import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine({
  // Hosts the SSR engine will accept (Angular SSRF protection).
  // Extendable at runtime with the NG_ALLOWED_HOSTS env var (comma-separated).
  allowedHosts: [
    'vitalinkcouriers.com',
    '*.vitalinkcouriers.com',
    'localhost',
    '127.0.0.1',
    ...(process.env['NG_ALLOWED_HOSTS']?.split(',').map((host) => host.trim()).filter(Boolean) ?? []),
  ],
});

const isExpressHost = (hostname: string): boolean =>
  hostname === 'express.vitalinkcouriers.com';

const isMainHost = (hostname: string): boolean =>
  hostname === 'vitalinkcouriers.com' || hostname === 'www.vitalinkcouriers.com';

app.get('/sitemap.xml', (req, res, next) => {
  if (!isExpressHost(req.hostname)) {
    next();
    return;
  }
  res.sendFile(join(browserDistFolder, 'sitemap-express.xml'));
});

app.get('/robots.txt', (req, res, next) => {
  if (!isExpressHost(req.hostname)) {
    next();
    return;
  }
  res.sendFile(join(browserDistFolder, 'robots-express.txt'));
});

/**
 * Keep each production hostname inside its intended information architecture.
 */
app.use((req, res, next) => {
  if (isExpressHost(req.hostname)) {
    if (req.path === '/') {
      res.redirect(301, '/express');
      return;
    }

    const expressRedirects: Record<string, string> = {
      '/services': '/express/services',
      '/contact': '/express/contact',
    };
    const expressDestination = expressRedirects[req.path];
    if (expressDestination) {
      res.redirect(301, expressDestination);
      return;
    }

    const mainSitePaths = ['/about', '/sam-gov', '/certifications', '/faq', '/blog'];
    if (mainSitePaths.includes(req.path)) {
      res.redirect(301, `https://www.vitalinkcouriers.com${req.originalUrl}`);
      return;
    }
  }

  if (isMainHost(req.hostname) && req.path.startsWith('/express')) {
    res.redirect(301, `https://express.vitalinkcouriers.com${req.originalUrl}`);
    return;
  }

  next();
});

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
