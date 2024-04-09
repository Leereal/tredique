import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { PrimeReactProvider } from "primereact/api";

import "./globals.css";
import "primereact/resources/themes/tailwind-light/theme.css";

import { siteConfig } from "@/config/site";

const IBMPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: "%s | " + siteConfig.name,
  },
  description: siteConfig.description || "",
  icons: [{ url: "/assets/images/logo.png", href: "/assets/images/logo.png" }],
  metadataBase: new URL(siteConfig.metadataBase),
  // openGraph: {
  //   title: siteConfig.name,
  //   description: siteConfig.description || "",
  //   images: "./opengraph-image.png",
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   site: siteConfig.twitter,
  //   title: siteConfig.name,
  //   description: siteConfig.description || "",
  //   images: "./opengraph-image.png",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ClerkProvider
    //   appearance={{
    //     variables: { colorPrimary: "#624cf5" },
    //   }}
    // >
    //   <PrimeReactProvider>
    //     <html lang="en">
    //       <body className={cn("font-IBMPlex antialiased", IBMPlex.variable)}>
    //         {children}
    //       </body>
    //     </html>
    //   </PrimeReactProvider>
    // </ClerkProvider>
    <html>
      <body>Down</body>
    </html>
  );
}
