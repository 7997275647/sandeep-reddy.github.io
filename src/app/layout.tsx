import type { Metadata, Viewport } from "next";
import { MotionProvider } from "@/components/motion-provider";
import { person } from "@/data/portfolio";
import { siteUrl } from "@/lib/deployment";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: "Sandeep Reddy Modugu | Embedded Software Engineer",
  description: person.description,
  applicationName: "Sandeep Modugu - Engineering Portfolio",
  authors: [{ name: person.name, url: person.github }],
  creator: person.name,
  keywords: ["Embedded Software Engineer", "Embedded C", "STM32", "ARM Cortex-M", "FreeRTOS", "Motor Control", "CMSIS-DSP", "MISRA C", "Hardware-in-the-Loop", "Germany", "Sandeep Reddy Modugu"],
  alternates: { canonical: `${siteUrl}/` },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: `${siteUrl}/`,
    siteName: "Sandeep Modugu",
    title: "Sandeep Reddy Modugu | Embedded Software Engineer",
    description: person.description,
    images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: "Sandeep Reddy Modugu, embedded software engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sandeep Reddy Modugu | Embedded Software Engineer",
    description: person.description,
    images: [`${siteUrl}/og-image.png`],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#101210", colorScheme: "light" };

const themeScript = `(function(){try{if(localStorage.getItem("theme")==="dark"){document.documentElement.classList.remove("light");document.documentElement.classList.add("dark");}}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
