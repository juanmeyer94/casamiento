/* eslint-disable no-console */
export function middleware(request) {
  // implementar middleware en un futuro
  return console.log(request);
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
