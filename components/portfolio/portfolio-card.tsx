import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Images } from "lucide-react"
import { Reveal } from "@/components/cinematic/reveal"

type Props = {
  slug: string
  name: string
  role: string
  description: string
  itemCount: number
  featured: string | null
  index?: number
}

export function PortfolioCard({
  slug,
  name,
  role,
  description,
  itemCount,
  featured,
  index = 0,
}: Props) {
  return (
    <Reveal delay={index * 0.05}>
      <Link
        href={`/portfolio/${slug}`}
        className="group block"
        data-cursor="hover"
      >
        <article
          className="
            relative overflow-hidden rounded-[30px]
            border border-[#17201d]/10
            bg-[#f4f2ec]
            shadow-[0_20px_70px_rgba(23,32,29,0.10)]
            transition-all duration-700
            hover:-translate-y-2
            hover:border-[#d6ad55]/50
            hover:shadow-[0_25px_80px_rgba(23,32,29,0.16),0_0_50px_rgba(15,118,110,0.10)]
          "
        >
          {/* IMAGE / COVER */}
          <div className="relative aspect-[16/10] overflow-hidden bg-[#dfe5e1]">

            {/* Sea-green atmospheric glow */}
            <div
              className="
                absolute -left-20 -top-20 z-[1]
                h-56 w-56 rounded-full
                bg-[#0f766e]/15
                blur-[70px]
                transition-all duration-700
                group-hover:bg-[#2aa99a]/25
                group-hover:scale-125
              "
            />

            {/* Gold atmospheric glow */}
            <div
              className="
                absolute -right-20 -bottom-20 z-[1]
                h-56 w-56 rounded-full
                bg-[#d6ad55]/15
                blur-[80px]
                transition-all duration-700
                group-hover:bg-[#d6ad55]/25
              "
            />

            {featured ? (
              <Image
                src={featured}
                alt={`${name} selected work`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="
                  object-cover
                  opacity-95
                  transition-all duration-1000
                  group-hover:scale-[1.06]
                  group-hover:opacity-100
                "
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="
                    flex h-20 w-20 items-center justify-center
                    rounded-full
                    border border-[#d6ad55]/30
                    bg-[#0f766e]/10
                    text-[#1f7a6d]
                  "
                >
                  <Images className="h-8 w-8" />
                </div>
              </div>
            )}

            {/* Light cinematic overlay */}
            <div
              className="
                absolute inset-0 z-[2]
                bg-gradient-to-t
                from-[#17201d]/75
                via-[#17201d]/10
                to-transparent
              "
            />

            {/* Subtle emerald glass layer */}
            <div
              className="
                absolute inset-0 z-[2]
                bg-gradient-to-br
                from-[#0f766e]/10
                via-transparent
                to-[#061412]/15
                opacity-70
              "
            />

            {/* Top category indicator */}
            <div className="absolute left-5 top-5 z-[4] md:left-6 md:top-6">
              <div className="flex items-center gap-2">
                <span className="h-[1px] w-6 bg-[#d6ad55]" />

                <span
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.28em]
                    text-[#f5d77f]
                    drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]
                  "
                >
                  {role}
                </span>
              </div>
            </div>

            {/* Bottom information */}
            <div className="absolute bottom-0 left-0 right-0 z-[4] flex items-end justify-between gap-4 p-5 md:p-6">
              <div className="min-w-0">
                <h3
                  className="
                    font-heading
                    text-2xl
                    font-semibold
                    leading-tight
                    tracking-[-0.02em]
                    text-white
                    drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]
                    transition-colors
                    duration-500
                    group-hover:text-[#efd27b]
                    md:text-3xl
                  "
                >
                  {name}
                </h3>
              </div>

              <span
                className="
                  flex h-12 w-12 shrink-0 items-center justify-center
                  rounded-full
                  border border-white/25
                  bg-[#17201d]/55
                  text-white
                  backdrop-blur-md
                  transition-all duration-500
                  group-hover:border-[#d6ad55]
                  group-hover:bg-[#d6ad55]
                  group-hover:text-[#061412]
                  group-hover:rotate-0
                "
              >
                <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </div>

          {/* CARD CONTENT */}
          <div
            className="
              relative
              border-t border-[#17201d]/10
              bg-gradient-to-b
              from-[#f7f5ef]
              to-[#ebe9e2]
              p-5
              md:p-6
            "
          >
            {/* Small top accent */}
            <div
              className="
                absolute left-6 top-0 h-px w-10
                bg-[#d6ad55]/70
                transition-all duration-500
                group-hover:w-20
                group-hover:bg-[#d6ad55]
              "
            />

            <p className="line-clamp-2 text-sm leading-relaxed text-[#4f5a56]">
              {description}
            </p>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#68736e]">
                {itemCount
                  ? `${itemCount} ${itemCount === 1 ? "piece" : "pieces"}`
                  : "Work coming soon"}
              </span>

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-[#a98035]
                  transition-all duration-500
                  group-hover:tracking-[0.28em]
                  group-hover:text-[#0f766e]
                "
              >
                View Project
              </span>
            </div>
          </div>
        </article>
      </Link>
    </Reveal>
  )
}