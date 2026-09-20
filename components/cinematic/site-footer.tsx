import Link from "next/link"
import { ArrowUpRight, Mail, Phone } from "lucide-react"
import { site } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-orange font-bold text-primary-foreground">S</span>
              <span className="font-heading text-lg font-semibold">{site.fullName}</span>
            </div>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">{site.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/#work" className="rounded-full border border-border px-4 py-2 text-muted-foreground hover:text-foreground">Work</Link>
            <Link href="/about" className="rounded-full border border-border px-4 py-2 text-muted-foreground hover:text-foreground">About</Link>
            <Link href="/contact" className="rounded-full border border-border px-4 py-2 text-muted-foreground hover:text-foreground">Contact</Link>
            <a href={site.behance} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-gold to-orange px-4 py-2 font-semibold text-primary-foreground">Behance <ArrowUpRight className="h-4 w-4" /></a>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.fullName}. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            {site.phone && <a href={`tel:${site.phone}`} className="inline-flex items-center gap-1 hover:text-gold"><Phone className="h-3.5 w-3.5" />{site.phone}</a>}
            {site.email && <a href={`mailto:${site.email}`} className="inline-flex items-center gap-1 hover:text-gold"><Mail className="h-3.5 w-3.5" />{site.email}</a>}
          </div>
        </div>
      </div>
    </footer>
  )
}
