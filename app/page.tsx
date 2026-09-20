import Link from "next/link"
import {
  ArrowDown,
  ArrowUpRight,
  Palette,
  Package,
  PenTool,
  Layers3,
} from "lucide-react"

import { Reveal } from "@/components/cinematic/reveal"
import { PortfolioCard } from "@/components/portfolio/portfolio-card"
import { PortfolioPresenter } from "@/components/portfolio/presenter/PortfolioPresenter"
import { portfolio } from "@/lib/portfolio.generated"

export default function HomePage() {
  const categories = portfolio

  return (
    <main className="min-h-screen bg-background text-[#17201d]">

      {/* HERO */}
      <section
        id="hero"
        className="relative overflow-hidden px-5 pb-16 pt-32 md:px-8 md:pb-20 md:pt-40"
      >
        <PortfolioPresenter />

        <div className="pointer-events-none absolute left-[-10%] top-[10%] h-[420px] w-[420px] rounded-full bg-sea/10 blur-[120px]" />

        <div className="pointer-events-none absolute right-[-10%] top-[15%] h-[350px] w-[350px] rounded-full bg-gold/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl">

          <Reveal>
            <div className="mb-8 flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />

              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-sea">
                Visual Designer · Packaging · Brand Communication
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="max-w-3xl font-heading text-[clamp(2.7rem,5vw,5rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-[#17201d]">
              I design visuals
              <br />
              that make brands
              <br />
              remembered.
            </h1>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-7 flex max-w-2xl flex-col gap-4">
              <p className="text-base leading-7 text-[#5f6965] md:text-lg">
                I’m a graphic designer with 5+ years of professional
                experience across packaging, branding, digital campaigns,
                print, illustration and commercial visual communication.
              </p>

              <p className="text-sm leading-6 text-[#7a837f]">
                From product packaging and retail displays to large-format
                advertising, social campaigns and corporate materials I
                design for real-world production, not just presentation.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.20}>
            <div className="mt-8 flex flex-wrap items-center gap-3">

              <Link
  href="#work"
  className="group flex items-center gap-3 rounded-full border border-sea/30 bg-sea px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-sea"
>
  Explore Selected Work
  <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
</Link>

              <Link
                href="/about"
                className="rounded-full border border-[#17201d]/15 bg-white/50 px-6 py-3.5 text-sm font-semibold text-[#17201d] backdrop-blur-md transition-all duration-300 hover:border-sea/40 hover:bg-white/80 hover:text-sea"
              >
                About Me
              </Link>

            </div>
          </Reveal>

        </div>
      </section>


      {/* SELECTED WORK */}
      <section
        id="work"
        className="relative px-5 py-16 md:px-8 md:py-20"
      >
        <div className="mx-auto max-w-7xl">

          <Reveal>
            <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">

              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px w-8 bg-gold" />

                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-sea">
                    Selected Work
                  </span>
                </div>

                <h2 className="max-w-3xl font-heading text-3xl font-semibold tracking-[-0.035em] text-[#17201d] md:text-5xl">
                  From pixels to print.
                  <br />

                  <span className="text-[#69736f]">
                    Built for real brands.
                  </span>
                </h2>
              </div>

              <p className="max-w-sm text-sm leading-6 text-[#707a76]">
                A collection of commercial design work spanning packaging,
                identity, campaigns, print, illustration and digital
                communication.
              </p>

            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {categories.map((item, index) => (
              <PortfolioCard
                key={item.slug}
                {...item}
                index={index}
              />
            ))}
          </div>

        </div>
      </section>


      {/* CAPABILITIES */}
      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">

          <Reveal>
            <div className="mb-10">

              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-gold" />

                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-sea">
                  Capabilities
                </span>
              </div>

              <h2 className="font-heading text-3xl font-semibold tracking-[-0.035em] text-[#17201d] md:text-5xl">
                What I bring to the table.
              </h2>

            </div>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

            <Reveal delay={0}>
              <div className="group h-full rounded-3xl border border-[#17201d]/10 bg-[#f4f2ec]/70 p-6 shadow-[0_15px_50px_rgba(23,32,29,0.05)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[#1f7a6d]/30 hover:bg-white/70">

                <Package className="capability-icon h-6 w-6" />

                <h3 className="mt-6 font-heading text-xl font-semibold text-[#17201d]">
                  Packaging
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#707a76]">
                  Product packaging, print-ready artwork, boxes, labels and
                  retail visuals.
                </p>

              </div>
            </Reveal>


            <Reveal delay={0.05}>
              <div className="group h-full rounded-3xl border border-[#17201d]/10 bg-[#f4f2ec]/70 p-6 shadow-[0_15px_50px_rgba(23,32,29,0.05)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[#1f7a6d]/30 hover:bg-white/70">

                <Palette className="capability-icon h-6 w-6" />

                <h3 className="mt-6 font-heading text-xl font-semibold text-[#17201d]">
                  Brand & Identity
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#707a76]">
                  Logos, visual systems, corporate communication and brand
                  assets.
                </p>

              </div>
            </Reveal>


            <Reveal delay={0.10}>
              <div className="group h-full rounded-3xl border border-[#17201d]/10 bg-[#f4f2ec]/70 p-6 shadow-[0_15px_50px_rgba(23,32,29,0.05)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[#1f7a6d]/30 hover:bg-white/70">

                <Layers3 className="capability-icon h-6 w-6" />

                <h3 className="mt-6 font-heading text-xl font-semibold text-[#17201d]">
                  Digital & Campaigns
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#707a76]">
                  Social media, web banners, promotional campaigns and
                  digital content.
                </p>

              </div>
            </Reveal>


            <Reveal delay={0.15}>
              <div className="group h-full rounded-3xl border border-[#17201d]/10 bg-[#f4f2ec]/70 p-6 shadow-[0_15px_50px_rgba(23,32,29,0.05)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[#1f7a6d]/30 hover:bg-white/70">

                <PenTool className="capability-icon h-6 w-6" />

                <h3 className="mt-6 font-heading text-xl font-semibold text-[#17201d]">
                  Illustration & Art
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#707a76]">
                  Hand-drawn artwork, illustration, sketching and visual
                  concepts.
                </p>

              </div>
            </Reveal>

          </div>
        </div>
      </section>


      {/* APPROACH */}
      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">

            <Reveal>
              <div>

                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px w-8 bg-gold" />

                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-sea">
                    Approach
                  </span>
                </div>

                <h2 className="font-heading text-3xl font-semibold tracking-[-0.04em] text-[#17201d] md:text-5xl">
                  Good design
                  <br />

                  <span className="text-sea">
                    has a job to do.
                  </span>
                </h2>

              </div>
            </Reveal>


            <Reveal delay={0.1}>
              <div className="rounded-[30px] border border-[#17201d]/10 bg-[#f4f2ec]/75 p-7 shadow-[0_20px_70px_rgba(23,32,29,0.06)] backdrop-blur-md md:p-10">

                <p className="text-lg leading-8 text-[#3f4945]">
                  My work sits between visual craft and commercial
                  communication. Whether it is a product box, campaign,
                  catalogue, vehicle wrap, outdoor advertisement or social
                  post, the goal is to make the message clear while keeping
                  the visual identity memorable.
                </p>

                <div className="mt-8 flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-gold" />

                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#68736e]">
                    Design with purpose
                  </span>
                </div>

              </div>
            </Reveal>

          </div>
        </div>
      </section>


      {/* FINAL CTA */}
      <section className="px-5 pb-20 pt-12 md:px-8 md:pb-28 md:pt-16">
        <div className="mx-auto max-w-7xl">

          <Reveal>
            <div className="text-center">

              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sea">
                Let&apos;s create something memorable
              </p>

              <h2 className="mx-auto mt-5 max-w-3xl font-heading text-3xl font-semibold tracking-[-0.04em] text-[#17201d] md:text-5xl">
                Have a project in mind?
              </h2>

              <Link
  href="/contact"
  className="mt-8 inline-flex items-center gap-3 rounded-full border border-sea/30 bg-sea px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-sea"
>
  Start a conversation
  <ArrowUpRight className="h-4 w-4" />
</Link>

            </div>
          </Reveal>

        </div>
      </section>

    </main>
  )
}