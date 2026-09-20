import type { Metadata } from "next"
import { Inter, Sora } from "next/font/google"
import "./globals.css"
import { SiteNav } from "@/components/cinematic/site-nav"
import { SiteFooter } from "@/components/cinematic/site-footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-geist-sans" })
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" })

export const metadata: Metadata = {
  title: "Saad Ullah Khan | Graphic Designer & Packaging Specialist",
  description: "Portfolio of Saad Ullah Khan — graphic design, packaging, branding, social media, print, digital design, and illustration.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${inter.variable} ${sora.variable}`}><SiteNav />{children}<SiteFooter /></body></html>
}
