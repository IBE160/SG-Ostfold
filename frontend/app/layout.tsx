import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SG Ostfold",
  description: "Shift & KPI Reporting Solution for SG Ostfold",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // Viktig: ikke hardkod "dark" her. La ThemeProvider styre klassen.
    // suppressHydrationWarning hindrer React i å klage hvis initial tema avviker.
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"      // start i dark-mode
          enableSystem={false}     // ignorer system-tema (valgfritt)
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
