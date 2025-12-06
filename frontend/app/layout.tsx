import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SG Ostfold",
  description: "Shift & KPI Reporting Solution for SG Ostfold",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // Apply dark class to html
    <html lang="en" className="dark">
      <body className={`${inter.className} flex min-h-screen bg-background text-foreground`}>
        <aside className="w-72 bg-card border-r border-border p-4">
          <h2 className="text-xl font-bold mb-4">Navigation</h2>
          <nav>
            <ul>
              <li className="mb-2">
                <a href="/" className="block text-muted-foreground hover:text-foreground">Dashboard</a>
              </li>
              <li className="mb-2">
                <a href="/reports" className="block text-muted-foreground hover:text-foreground">Shift Reports</a>
              </li>
              <li className="mb-2">
                <a href="/historical" className="block text-muted-foreground hover:text-foreground">Historical Data</a>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-8">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
