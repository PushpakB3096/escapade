export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    // protected routes will go here
    '/tips',
    '/reservations',
    '/properties',
    '/favorites'
  ]
};
