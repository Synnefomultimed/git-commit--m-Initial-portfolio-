import { notFound } from "next/navigation"
import type { Metadata } from "next"

import { PortfolioShell } from "@/components/portfolio/portfolio-shell"
import { portfolio } from "@/lib/portfolio.generated"

export function generateStaticParams() {
  return portfolio.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const project = portfolio.find(
    (item) => item.slug === slug
  )

  if (!project) {
    return {}
  }

  return {
    title: `${project.name} — Saad Ullah Khan`,
    description: project.description,
  }
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const index = portfolio.findIndex(
    (item) => item.slug === slug
  )

  if (index === -1) {
    notFound()
  }

  const project = portfolio[index]

  return (
    <PortfolioShell
      project={project}
      previous={
        index > 0
          ? portfolio[index - 1]
          : undefined
      }
      next={
        index < portfolio.length - 1
          ? portfolio[index + 1]
          : undefined
      }
    />
  )
}