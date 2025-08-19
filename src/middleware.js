import { withAuth } from "next-auth/middleware";

export default withAuth(
  () => {
    // Middleware adicional si es necesario
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Proteger rutas /admin/dashboard
        if (req.nextUrl.pathname.startsWith("/admin/dashboard")) {
          return !!token;
        }
        return true;
      },
    },
  },
);

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
