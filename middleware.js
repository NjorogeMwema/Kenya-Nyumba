import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes:['/','/view-listing/:path*','/rent'],
});

export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
};