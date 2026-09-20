"use client"

import { useCallback, useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { SmartImage } from "./smart-image"

export type GalleryItem = {
  src: string
  title: string
  tag?: string
}

export function LightboxGallery({
  items,
}: {
  items: GalleryItem[]
}) {
  const [active, setActive] = useState<number | null>(null)

  const close = useCallback(() => {
    setActive(null)
  }, [])

  const next = useCallback(() => {
    setActive((i) =>
      i === null ? i : (i + 1) % items.length
    )
  }, [items.length])

  const prev = useCallback(() => {
    setActive((i) =>
      i === null
        ? i
        : (i - 1 + items.length) % items.length
    )
  }, [items.length])

  useEffect(() => {
    if (active === null) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
    }

    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"

    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [active, close, next, prev])

  return (
    <>
      {/* Gallery */}
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {items.map((item, i) => (
          <motion.button
            key={item.src}
            type="button"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.5,
              delay: (i % 3) * 0.05,
            }}
            onClick={() => setActive(i)}
            data-cursor="hover"
            className="group relative block w-full overflow-hidden rounded-[20px] text-left"
          >
            <SmartImage
              src={item.src}
              alt={item.title}
              rounded="rounded-[20px]"
              className=""
            />

            {/* Subtle hover effect */}
            <div className="pointer-events-none absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </motion.button>
        ))}
      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl"
            onClick={close}
          >
            {/* Close */}
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full glass text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Previous */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              aria-label="Previous"
              className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full glass text-white md:left-8"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              aria-label="Next"
              className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full glass text-white md:right-8"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Actual Image */}
            <motion.div
              key={active}
              initial={{
                opacity: 0,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 24,
              }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[90vh] max-w-[90vw] items-center justify-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={items[active].src}
                alt={items[active].title}
                className="max-h-[85vh] max-w-[85vw] rounded-xl object-contain"
              />
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full glass px-4 py-2 text-xs text-white">
              {active + 1} / {items.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}