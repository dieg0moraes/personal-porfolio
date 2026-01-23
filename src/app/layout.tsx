import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Diego Moraes | Senior Software Engineer",
  description: "Senior Software Engineer @ Mercado Libre. Building efficient, scalable solutions.",
  keywords: ["developer", "senior software engineer", "react", "python", "mercado libre"],
  authors: [{ name: "Diego Moraes" }],
  openGraph: {
    title: "Diego Moraes | Senior Software Engineer",
    description: "Senior Software Engineer @ Mercado Libre. Building efficient, scalable solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceMono.variable} antialiased font-mono`}>
        {children}
      </body>
    </html>
  );
}
