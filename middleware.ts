// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// // Only allow homepage, podcast playback, and auth pages as public
// const isPublicRoute = createRouteMatcher([
//   '/sign-in(.*)',
//   '/sign-up(.*)',
//   '/',
//   '/podcasts(.*)',
//   '/discover(.*)',
// ]);

// // export default clerkMiddleware((auth, req) => {
// //   const url = req.nextUrl.pathname;
// //   if (!isPublicRoute(req)) {
// //     console.log(`[PROTECTED] ${url} - redirecting to sign-in`);
// //     auth().protect();
// //   } else {
// //     console.log(`[PUBLIC] ${url} - accessible without login`);
// //   }
// // });

// export default clerkMiddleware((auth, req) => {
//   if (!isPublicRoute(req)) {
//     // Always use a clean absolute path for sign-in
//     console.log(`[PROTECTED] ${req.nextUrl.pathname} - redirecting to sign-in`);

//     auth().protect(undefined, { unauthenticatedUrl: '/sign-in' });
//   }
// });

// export const config = {
//   matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
// };








import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/',
  '/podcasts(.*)',
  '/discover(.*)',
]);

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) {
    const user = auth().userId;

    if (!user) {
      console.log(`[PROTECTED] ${req.nextUrl.pathname} - redirecting manually to /sign-in`);

      const signInUrl = new URL('/sign-in', req.url);
      return NextResponse.redirect(signInUrl);
    }

    console.log(`[PROTECTED] ${req.nextUrl.pathname} - authenticated`);
  } else {
    console.log(`[PUBLIC] ${req.nextUrl.pathname} - no auth required`);
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
