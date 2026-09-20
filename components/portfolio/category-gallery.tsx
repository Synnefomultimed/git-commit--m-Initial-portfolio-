"use client"

import {
  LightboxGallery,
  type GalleryItem,
} from "@/components/cinematic/lightbox-gallery"

type Item = {
  src: string
  title: string
  type: string
}

export function CategoryGallery({
  items,
}: {
  items: readonly Item[]
}) {
  const images = items.filter(
    (item) => item.type === "image"
  ) as GalleryItem[]

  const videos = items.filter(
    (item) => item.type === "video"
  )

  const pdfs = items.filter(
    (item) => item.type === "pdf"
  )

  return (
    <>
      {/* =========================
          IMAGE GALLERY
          ========================= */}
      {images.length > 0 && (
        <LightboxGallery items={images} />
      )}

      {/* =========================
          VIDEO GALLERY
          ========================= */}
      {videos.length > 0 && (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <div
              key={video.src}
              className="overflow-hidden rounded-[20px] border border-white/10 bg-black"
            >
              <video
                src={video.src}
                controls
                preload="metadata"
                className="h-auto w-full"
                aria-label={video.title}
              />
            </div>
          ))}
        </div>
      )}

      {/* =========================
          PDF GALLERY
          ========================= */}
      {pdfs.length > 0 && (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pdfs.map((pdf) => (
            <button
              key={pdf.src}
              type="button"
              onClick={() => {
                window.open(
                  pdf.src,
                  "_blank",
                  "noopener,noreferrer"
                )
              }}
              className="group relative w-full overflow-hidden rounded-[20px] border border-white/10 bg-[#111] text-left transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_15px_50px_rgba(0,0,0,0.35)]"
            >
              {/* PDF Cover */}
              <div className="relative flex h-[360px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#1d1d1d] via-[#111] to-[#080808]">
                {/* Background glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,170,0,0.14),transparent_55%)]" />

                {/* Decorative lines */}
                <div className="absolute left-8 top-8 h-px w-24 bg-gold/20" />
                <div className="absolute right-8 top-8 h-px w-24 bg-gold/20" />
                <div className="absolute bottom-8 left-8 h-px w-24 bg-gold/20" />
                <div className="absolute bottom-8 right-8 h-px w-24 bg-gold/20" />

                {/* PDF Icon */}
                <div className="relative flex flex-col items-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10 shadow-2xl transition-transform duration-300 group-hover:scale-110">
                    <span className="text-2xl font-bold tracking-wide text-gold">
                      PDF
                    </span>
                  </div>

                  <p className="mt-5 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    Document
                  </p>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-black shadow-lg">
                    Open PDF
                  </span>
                </div>
              </div>

              {/* PDF Information */}
              <div className="flex items-center gap-3 px-5 py-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 text-[11px] font-bold text-gold">
                  PDF
                </div>

                <div>
                  <p className="font-medium text-white">
                    PDF Design
                  </p>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Click to view full document
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </>
  )
}