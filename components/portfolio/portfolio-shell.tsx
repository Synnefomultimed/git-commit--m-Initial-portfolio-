"use client"

import Link from "next/link"
import { ArrowLeft, ArrowRight, BriefcaseBusiness } from "lucide-react"
import { Reveal } from "@/components/cinematic/reveal"
import { CategoryGallery } from "./category-gallery"
import type { portfolio } from "@/lib/portfolio.generated"

type Project = (typeof portfolio)[number]

export function PortfolioShell({
  project,
  previous,
  next,
}: {
  project: Project
  previous?: Project
  next?: Project
}) {
  return (
    <main className="min-h-screen">

      {/* Hero */}
      <section className="px-4 pb-10 pt-32 md:px-6 md:pt-40">
        <div className="mx-auto max-w-7xl">

          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" />
            All work
          </Link>

          <div className="mt-10 max-w-4xl">
            <Reveal>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                <BriefcaseBusiness className="h-4 w-4" />
                {project.role}
              </p>

              <h1 className="mt-4 font-heading text-5xl font-semibold tracking-tight text-white md:text-7xl">
                {project.name}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                {project.description}
              </p>
            </Reveal>
          </div>

        </div>
      </section>


      {/* Category Navigation */}
      {project.categories.length > 0 && (
        <section className="sticky top-0 z-40 border-y border-white/10 bg-background/90 px-4 py-4 backdrop-blur-xl md:px-6">
          <div className="mx-auto max-w-7xl">

            <div className="flex gap-2 overflow-x-auto scrollbar-hide">

              <a
                href="#all"
                className="shrink-0 rounded-full border border-white/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition hover:border-gold/40 hover:text-gold"
              >
                All
              </a>

              {project.categories.map((category) => (
                <a
                  key={category.slug}
                  href={`#${category.slug}`}
                  className="shrink-0 rounded-full border border-white/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition hover:border-gold/40 hover:text-gold"
                >
                  {category.name}
                </a>
              ))}

            </div>

          </div>
        </section>
      )}


      {/* Portfolio */}
      <section
        id="all"
        className="px-4 pb-24 pt-10 md:px-6"
      >
        <div className="mx-auto max-w-7xl">

          {project.categories.length ? (
            project.categories.map((category, index) => (

              <Reveal
                key={category.slug}
                delay={index * 0.04}
              >
                <div
                  id={category.slug}
                  className="mb-24 scroll-mt-24"
                >

                  <div className="mb-7 flex items-end justify-between gap-4 border-b border-white/10 pb-4">

                    <div>
                      <p className="text-[11px] uppercase tracking-[0.28em] text-gold">
                        Selected work
                      </p>

                      <h2 className="mt-1 font-heading text-2xl font-semibold md:text-3xl">
                        {category.name}
                      </h2>
                    </div>

                    <span className="text-xs text-muted-foreground">
                      {category.items.length}{" "}
                      {category.items.length === 1 ? "piece" : "pieces"}
                    </span>

                  </div>

                  <CategoryGallery items={category.items} />

                </div>
              </Reveal>

            ))
          ) : (

            <div className="rounded-[28px] border border-dashed border-white/15 bg-white/[0.025] p-12 text-center">

              <h2 className="font-heading text-2xl font-semibold">
                Work coming soon
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                Add images to{" "}
                <code className="text-gold">
                  public/portfolio/{project.slug}/
                </code>{" "}
                and they will appear here after the next build.
              </p>

            </div>

          )}


          {/* Previous / Next */}
          <div className="grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2">

            {previous ? (
              <Link
                href={`/portfolio/${previous.slug}`}
                className="group rounded-2xl border border-white/10 p-5 hover:border-gold/30"
              >
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  Previous
                </span>

                <div className="mt-2 flex items-center justify-between font-heading font-semibold">
                  <span>{previous.name}</span>

                  <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
                </div>
              </Link>
            ) : (
              <div />
            )}

            {next && (
              <Link
                href={`/portfolio/${next.slug}`}
                className="group rounded-2xl border border-white/10 p-5 text-right hover:border-gold/30"
              >
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  Next
                </span>

                <div className="mt-2 flex items-center justify-between font-heading font-semibold">
                  <span>{next.name}</span>

                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            )}

          </div>

        </div>
      </section>

    </main>
  )
}