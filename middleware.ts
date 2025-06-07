import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Add podcasts and profile routes as public for guest access
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/',
  '/podcasts(.*)',
  '/profile(.*)'
])

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};