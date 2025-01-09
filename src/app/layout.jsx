import "./globals.css";

export const metadata = {
  title: "Casamiento Ivan y Mica 2025",
  description: "Te invitamos a celebrar y ser parte de nuestro casamiento este 2025",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
