
import "./globals.css";

export const metadata = {
  title: "Cinematic Gallery",
  description: "Agency style scroll gallery",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
