"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { nav, site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function SiteNav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6">
      <div className={cn("mx-auto max-w-7xl transition-all duration-500", scrolled && "md:max-w-6xl")}>
        <div className={cn("flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500", scrolled ? "glass-strong glow-gold" : "glass")}>
          <Link href="/" className="flex items-center gap-3" data-cursor="hover">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-orange font-heading text-sm font-extrabold text-primary-foreground">S</span>
            <span className="hidden font-heading text-sm font-bold uppercase tracking-[0.22em] sm:block">Saad Ullah Khan</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const active = item.href.startsWith("/#") ? pathname === "/" : pathname === item.href
              return (
                <Link key={item.href} href={item.href} className={cn("rounded-full px-4 py-2 text-sm transition-colors", active ? "text-foreground" : "text-muted-foreground hover:text-foreground")}>
                  {active && <motion.span layoutId="nav-pill" className="absolute" />}
                  <span className="relative">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/#work" className="hidden rounded-full bg-gradient-to-r from-gold to-orange px-5 py-2.5 text-xs font-semibold text-primary-foreground transition-transform hover:scale-[1.03] sm:block">View Work</Link>
            <button onClick={() => setOpen(v => !v)} aria-label="Toggle menu" className="flex h-10 w-10 items-center justify-center rounded-full glass lg:hidden">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mx-auto mt-2 max-w-7xl rounded-3xl glass-strong p-3 lg:hidden">
            <nav className="flex flex-col gap-1">
              {nav.map(item => <Link key={item.href} href={item.href} className="rounded-2xl px-4 py-3 text-base text-muted-foreground hover:bg-white/5 hover:text-foreground">{item.label}</Link>)}
              <a href={site.behance} target="_blank" rel="noreferrer" className="mt-1 rounded-2xl bg-white/5 px-4 py-3 text-center text-sm text-foreground">Behance Portfolio</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
