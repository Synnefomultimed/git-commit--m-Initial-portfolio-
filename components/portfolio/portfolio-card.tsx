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
          <div className="relative aspect-[16/10] overflow-hidden bg-[#17201d]">

            {/* IMAGE */}
            {featured ? (
              <Image
                src={featured}
                alt={`${name} selected work`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="
                  object-cover
                  opacity-90
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
                    text-[#f5d77f]
                  "
                >
                  <Images className="h-8 w-8" />
                </div>
              </div>
            )}

            {/* DARK CINEMATIC OVERLAY */}
            <div
              className="
                absolute inset-0 z-[2]
                bg-gradient-to-t
                from-[#061412]/95
                via-[#17201d]/35
                to-[#17201d]/20
              "
            />

            {/* SEA GREEN ATMOSPHERIC GLOW */}
            <div
              className="
                absolute -left-20 -top-20 z-[2]
                h-56 w-56 rounded-full
                bg-[#0f766e]/20
                blur-[70px]
                transition-all duration-700
                group-hover:scale-125
                group-hover:bg-[#2aa99a]/30
              "
            />

            {/* GOLD ATMOSPHERIC GLOW */}
            <div
              className="
                absolute -right-20 -bottom-20 z-[2]
                h-56 w-56 rounded-full
                bg-[#d6ad55]/15
                blur-[80px]
                transition-all duration-700
                group-hover:bg-[#d6ad55]/25
              "
            />

            {/* TOP CATEGORY INDICATOR */}
            <div className="absolute left-5 top-5 z-[10] md:left-6 md:top-6">
              <div
                className="
                  inline-flex items-center gap-2
                  rounded-full
                  border border-white/20
                  bg-[#061412]/65
                  px-3 py-2
                  shadow-[0_4px_20px_rgba(0,0,0,0.25)]
                  backdrop-blur-md
                "
              >
                <span className="h-[1px] w-6 bg-[#f5d77f]" />

                <span
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.28em]
                    text-white
                    drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]
                  "
                >
                  {role}
                </span>
              </div>
            </div>

            {/* BOTTOM INFORMATION */}
            <div className="absolute bottom-0 left-0 right-0 z-[10] flex items-end justify-between gap-4 p-5 md:p-6">

              <div className="min-w-0">

                <div
                  className="
                    inline-block
                    rounded-2xl
                    border border-white/10
                    bg-[#061412]/55
                    px-4 py-3
                    shadow-[0_8px_30px_rgba(0,0,0,0.25)]
                    backdrop-blur-md
                  "
                >
                  <h3
                    className="
                      font-heading
                      text-2xl
                      font-bold
                      leading-tight
                      tracking-[-0.02em]
                      text-white
                      drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]
                      transition-colors
                      duration-500
                      group-hover:text-[#f5d77f]
                      md:text-3xl
                    "
                  >
                    {name}
                  </h3>
                </div>

              </div>

              <span
                className="
                  flex h-12 w-12 shrink-0 items-center justify-center
                  rounded-full
                  border border-white/30
                  bg-[#061412]/70
                  text-white
                  shadow-[0_8px_25px_rgba(0,0,0,0.3)]
                  backdrop-blur-md
                  transition-all duration-500
                  group-hover:border-[#d6ad55]
                  group-hover:bg-[#d6ad55]
                  group-hover:text-[#061412]
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

            {/* SMALL TOP ACCENT */}
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