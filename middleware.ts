import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Only allow homepage, podcast playback, and auth pages as public
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/',
  '/podcasts(.*)'
]);

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};