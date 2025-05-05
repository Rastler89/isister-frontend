import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { Toaster } from "../components/ui/toaster"
import { AuthProvider } from "../providers/AuthProvider"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import Script from "next/script"
import dynamic from "next/dynamic"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Isister - Salud para tus mascotas",
  description: "Gestiona la salud de tus mascotas",
}

const DynamicMatomoTracker = dynamic(() => import('../providers/MatomoTracker').then((mod) => mod.MatomoTracker), {
  ssr: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/img/veterinario.ico" />
        <Script
          id="matomo"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var _paq = window._paq = window._paq || [];
              _paq.push(['trackPageView']);
              _paq.push(['enableLinkTracking']);
              (function() {
                var u = "//matomo.rastler.dev/";
                _paq.push(['setTrackerUrl', u + 'matomo.php']);
                _paq.push(['setSiteId', '2']);
                var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
                g.async = true; g.src = u + 'matomo.js'; s.parentNode.insertBefore(g, s);
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
        <DynamicMatomoTracker />
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}

