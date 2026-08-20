import type { Metadata } from "next";
import "./globals.css";
import { ProgressProvider } from "@/lib/progress";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "KI-Kompetenz im Arbeitsalltag — Schulung nach Art. 4 KI-VO",
  description:
    "Interaktive Schulung zur KI-Kompetenz nach Art. 4 KI-VO: sechs Level zu Funktionsweise, Datenschutz, Risikoklassen und Verantwortung.",
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='12' fill='%232dd4bf'/%3E%3C/svg%3E",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <ProgressProvider>
          <Header />
          <main>{children}</main>
        </ProgressProvider>
      </body>
    </html>
  );
}
