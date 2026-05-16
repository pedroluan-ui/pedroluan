import type { Metadata } from "next";
import type React from "react";
import { Toaster } from "sonner";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import "./globals.css";

export const metadata: Metadata = {
  title: "TalentHub Currículos",
  description: "Sistema de gestão de currículos com Next.js, Tailwind e shadcn/ui.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster richColors position="top-right" closeButton />
      </body>
    </html>
  );
}
