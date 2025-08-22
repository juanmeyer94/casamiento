import "./globals.css";
import AuthSessionProvider from "@/components/Providers/SessionProvider";
import { AudioProvider } from "@/components/AudioProvider";

export const metadata = {
  title: "Casamiento Ivan y Mica 2025",
  description: "Te invitamos a celebrar y ser parte de nuestro casamiento este 2025",
  icons: {
    icon: "/bodanovios.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <AuthSessionProvider>
          <AudioProvider>
            {children}
          </AudioProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
