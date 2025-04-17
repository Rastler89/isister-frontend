import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { Toaster } from "../components/ui/toaster"
import { AuthProvider } from "../providers/AuthProvider"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { ThemeProvider } from "../components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Isister - Salud para tus mascotas",
  description: "Gestiona la salud de tus mascotas",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/img/veterinario.ico" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <Header />
            {children}
          </AuthProvider>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

