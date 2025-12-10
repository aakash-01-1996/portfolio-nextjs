import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aakash Ambodkar - Software Engineer & Full Stack Developer",
  description: "Full Stack Developer | AI/ML Engineer | System Design Expert. Experienced in building scalable web applications, designing distributed systems, and developing AI/ML solutions. Based in the US.",
  keywords: "software engineer, full stack developer, AI/ML engineer, React, Node.js, Python, system design, cloud computing, distributed systems",
  authors: [{ name: "Aakash Ambodkar", url: "https://aakash-portfolio.vercel.app" }],
  creator: "Aakash Ambodkar",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aakash-portfolio.vercel.app",
    siteName: "Aakash Ambodkar - Portfolio",
    title: "Aakash Ambodkar - Software Engineer & Full Stack Developer",
    description: "Full Stack Developer | AI/ML Engineer | System Design Expert. View my projects and skills.",
    images: [
      {
        url: "https://aakash-portfolio.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aakash Ambodkar - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aakash Ambodkar - Software Engineer",
    description: "Full Stack Developer | AI/ML Engineer | System Design",
    creator: "@AakashAmbodkar7",
    images: ["https://aakash-portfolio.vercel.app/twitter-image.jpg"],
  },
  alternates: {
    canonical: "https://aakash-portfolio.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%23007BFF' width='100' height='100'/><text x='50' y='65' font-size='70' font-weight='bold' fill='white' text-anchor='middle' font-family='Arial'>A</text></svg>" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Aakash Ambodkar",
              url: "https://aakash-portfolio.vercel.app",
              image: "https://aakash-portfolio.vercel.app/avatar.jpg",
              jobTitle: "Software Engineer",
              worksFor: {
                "@type": "Organization",
                name: "Optum",
              },
              sameAs: [
                "https://linkedin.com/in/aakashambodkar/",
                "https://github.com/aakash-01-1996",
                "https://twitter.com/AakashAmbodkar7",
              ],
              knowsAbout: [
                "Full Stack Development",
                "AI/ML",
                "System Design",
                "React",
                "Node.js",
                "Python",
                "Cloud Computing",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
