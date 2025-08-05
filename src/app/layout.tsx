import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "D8taOps - Transform Your Data Into Competitive Advantage",
  description: "Enterprise-grade DataOps solutions that scale. Reduce time-to-insight by 80% with D8taOps' data engineering, AI/ML, and cloud architecture expertise.",
  keywords: "DataOps, Data Engineering, AI/ML, Cloud Architecture, Data Pipeline, Analytics, Data Governance",
  authors: [{ name: "D8taOps Team" }],
  openGraph: {
    title: "D8taOps - Enterprise DataOps Solutions",
    description: "Transform your data into competitive advantage with enterprise-grade DataOps solutions.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "D8taOps - Enterprise DataOps Solutions",
    description: "Transform your data into competitive advantage with enterprise-grade DataOps solutions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen bg-gradient-to-br from-background via-background to-primary/5`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
