import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Only allow homepage, podcast playback, and auth pages as public
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/',
  '/podcasts(.*)',
  '/discover(.*)',
]);

// export default clerkMiddleware((auth, req) => {
//   const url = req.nextUrl.pathname;
//   if (!isPublicRoute(req)) {
//     console.log(`[PROTECTED] ${url} - redirecting to sign-in`);
//     auth().protect();
//   } else {
//     console.log(`[PUBLIC] ${url} - accessible without login`);
//   }
// });

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) {
    // Always use a clean absolute path for sign-in
    auth().protect(undefined, { unauthenticatedUrl: '/sign-in' });
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};