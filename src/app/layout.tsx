import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "SeatMapBuilder",
  description: "App para crear mapas de asientos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon"></link>
      </head>
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
