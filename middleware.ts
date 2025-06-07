import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Only allow homepage, podcast playback, and auth pages as public
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/',
  '/podcasts(.*)'
]);

export default clerkMiddleware((auth, req) => {
  const url = req.nextUrl.pathname;
  if (!isPublicRoute(req)) {
    // Log which routes are protected and which are public
    console.log(`[PROTECTED] ${url} - redirecting to sign-in`);
    auth().protect();
  } else {
    console.log(`[PUBLIC] ${url} - accessible without login`);
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};