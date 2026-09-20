"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export function SmartImage({
  src,
  alt,
  className,
  rounded = "rounded-2xl",
  label,
}: {
  src: string
  alt: string
  className?: string
  rounded?: string
  label?: string
}) {
  const [ok, setOk] = useState(true)
  const filename = label ?? src.split("/").pop()

  return (
    <div className={cn("relative overflow-hidden bg-surface", rounded, className)}>
      {ok ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="block h-auto w-full object-contain"
          onError={() => setOk(false)}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[linear-gradient(135deg,#151515,#0d0d0d)] p-4 text-center">
          <div className="absolute inset-0 noise opacity-[0.05]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,152,0,0.12),transparent_55%)]" />

          <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 bg-gold/10">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-6 w-6 text-gold"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <circle cx="8.5" cy="9.5" r="1.5" />
              <path
                d="m21 16-5-5L5 20"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <p className="relative font-mono text-xs text-muted-foreground">
            {filename}
          </p>

          <span className="relative rounded-full border border-border bg-background/50 px-3 py-1 text-[10px] uppercase tracking-widest text-muted-foreground/70">
            Image placeholder
          </span>
        </div>
      )}
    </div>
  )
}