import fs from "fs"
import path from "path"

const ROOT = process.cwd()

const PORTFOLIO_DIR = path.join(
  ROOT,
  "public",
  "portfolio"
)

const OUTPUT_FILE = path.join(
  ROOT,
  "lib",
  "portfolio.generated.ts"
)

// ============================================================
// FOLDERS TO COMPLETELY IGNORE
// ============================================================

const EXCLUDED_FOLDERS = [
  "freelance",
]

// ============================================================
// SUPPORTED FILE TYPES
// ============================================================

const IMAGE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".avif",
]

const VIDEO_EXTENSIONS = [
  ".mp4",
  ".webm",
  ".mov",
  ".m4v",
]

const PDF_EXTENSIONS = [
  ".pdf",
]

// ============================================================
// COVER FILE NAMES
// ============================================================

const COVER_NAMES = [
  "cover.jpg",
  "cover.jpeg",
  "cover.png",
  "cover.webp",
]

// ============================================================
// SLUG
// ============================================================

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

// ============================================================
// TITLE FROM FILE NAME
// ============================================================

function titleFromFilename(filename) {
  return path
    .basename(
      filename,
      path.extname(filename)
    )
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

// ============================================================
// FILE TYPE
// ============================================================

function getType(filename) {
  const extension = path
    .extname(filename)
    .toLowerCase()

  if (
    IMAGE_EXTENSIONS.includes(
      extension
    )
  ) {
    return "image"
  }

  if (
    VIDEO_EXTENSIONS.includes(
      extension
    )
  ) {
    return "video"
  }

  if (
    PDF_EXTENSIONS.includes(
      extension
    )
  ) {
    return "pdf"
  }

  return null
}

// ============================================================
// RECURSIVE FILE SCANNER
// ============================================================

function getFilesRecursive(directory) {
  if (!fs.existsSync(directory)) {
    return []
  }

  const results = []

  const entries = fs.readdirSync(
    directory,
    {
      withFileTypes: true,
    }
  )

  for (const entry of entries) {
    if (
      entry.name === "__MACOSX" ||
      entry.name === ".DS_Store"
    ) {
      continue
    }

    const fullPath = path.join(
      directory,
      entry.name
    )

    if (entry.isDirectory()) {
      results.push(
        ...getFilesRecursive(fullPath)
      )
    } else {
      results.push(fullPath)
    }
  }

  return results
}

// ============================================================
// CONVERT FILE PATH TO /PUBLIC URL
// ============================================================

function toPublicPath(filePath) {
  const relative = path.relative(
    path.join(ROOT, "public"),
    filePath
  )

  return (
    "/" +
    relative
      .split(path.sep)
      .join("/")
  )
}

// ============================================================
// FIND MANUAL COVER
// ============================================================

function getFeatured(directory) {
  for (const coverName of COVER_NAMES) {
    const coverPath = path.join(
      directory,
      coverName
    )

    if (fs.existsSync(coverPath)) {
      return toPublicPath(
        coverPath
      )
    }
  }

  return null
}

// ============================================================
// GET PORTFOLIO ITEMS
// ============================================================

function getItems(directory) {
  const files =
    getFilesRecursive(directory)

  return files
    .filter((filePath) => {
      const filename = path
        .basename(filePath)
        .toLowerCase()

      return !COVER_NAMES.includes(
        filename
      )
    })
    .map((filePath) => {
      const type =
        getType(filePath)

      if (!type) {
        return null
      }

      return {
        src: toPublicPath(
          filePath
        ),

        title:
          titleFromFilename(
            filePath
          ),

        type,
      }
    })
    .filter(Boolean)
    .sort((a, b) =>
      a.title.localeCompare(
        b.title
      )
    )
}

// ============================================================
// DESCRIPTIONS
// ============================================================

function getDescription(name) {
  const descriptions = {
    "Social Media & Digital":
      "Social media campaigns, promotional creatives, digital marketing visuals, and web graphics.",

    "Print & Promotional":
      "Flyers, brochures, menus, posters, promotional materials, and print-focused communication design.",

    Packaging:
      "Product packaging, boxes, labels, packaging layouts, and retail-ready visual design.",

    "Large Format & Outdoor":
      "Vehicle wraps, banners, hoardings, signage, retail displays, and large-format advertising.",

    Drawing:
      "Portraits, still-life studies, pencil sketches, and hand-drawn artwork.",

    Illustration:
      "Digital illustrations, creative artwork, concepts, and visual storytelling.",

    "Catalogue & Product Design":
      "Product catalogues, product layouts, product presentation, and commercial visual communication.",

    "Branding & Corporate Design":
      "Logos, corporate visuals, brand assets, and consistent visual identity applications.",
  }

  return (
    descriptions[name] ||
    "Selected graphic design work across digital and print media."
  )
}

// ============================================================
// CREATE ONE PORTFOLIO PROJECT
// ============================================================

function createProject(
  name,
  directory
) {
  const items =
    getItems(directory)

  const featured =
    getFeatured(directory)

  return {
    // Custom URL for Print & Promotional
    // Display name remains unchanged.
    slug:
      name === "Print & Promotional"
        ? "saad"
        : slugify(name),

    name,

    role: "Selected Work",

    description:
      getDescription(name),

    categories: [
      {
        slug: "selected-work",

        name: "Selected Work",

        items,
      },
    ],

    itemCount:
      items.length,

    featured,
  }
}

// ============================================================
// START SCANNING
// ============================================================

if (
  !fs.existsSync(
    PORTFOLIO_DIR
  )
) {
  console.error("")
  console.error(
    "ERROR: Portfolio folder was not found:"
  )
  console.error(
    PORTFOLIO_DIR
  )
  console.error("")

  process.exit(1)
}

// ============================================================
// GET TOP-LEVEL FOLDERS
// ============================================================

const topLevelFolders =
  fs
    .readdirSync(
      PORTFOLIO_DIR,
      {
        withFileTypes: true,
      }
    )
    .filter(
      (entry) =>
        entry.isDirectory()
    )
    .filter(
      (entry) =>
        entry.name !==
        "__MACOSX"
    )
    .filter(
      (entry) =>
        !EXCLUDED_FOLDERS.includes(
          entry.name.toLowerCase()
        )
    )

// ============================================================
// BUILD PORTFOLIO
// ============================================================

const portfolio = []

for (
  const folder of topLevelFolders
) {
  const folderName =
    folder.name

  const folderPath =
    path.join(
      PORTFOLIO_DIR,
      folderName
    )

  // ==========================================================
  // SPECIAL CASE
  //
  // Illustration & Sketching
  //
  // becomes:
  //
  // Drawing
  // Illustration
  //
  // ==========================================================

  if (
    folderName ===
    "Illustration & Sketching"
  ) {
    const subFolders =
      fs
        .readdirSync(
          folderPath,
          {
            withFileTypes: true,
          }
        )
        .filter(
          (entry) =>
            entry.isDirectory()
        )
        .filter(
          (entry) =>
            entry.name !==
            "__MACOSX"
        )

    for (
      const subFolder of subFolders
    ) {
      const subFolderPath =
        path.join(
          folderPath,
          subFolder.name
        )

      portfolio.push(
        createProject(
          subFolder.name,
          subFolderPath
        )
      )
    }

    continue
  }

  // ==========================================================
  // NORMAL CATEGORY
  // ==========================================================

  portfolio.push(
    createProject(
      folderName,
      folderPath
    )
  )
}

// ============================================================
// EXTRA SAFETY CHECK
// ============================================================

const cleanPortfolio =
  portfolio.filter(
    (project) =>
      project.slug !== "freelance"
  )

// ============================================================
// WRITE GENERATED TYPESCRIPT FILE
// ============================================================

const output = `// Auto-generated by scripts/scan-portfolio.mjs.
// DO NOT EDIT THIS FILE MANUALLY.

export const portfolio = ${JSON.stringify(
  cleanPortfolio,
  null,
  2
)} as const
`

fs.mkdirSync(
  path.dirname(
    OUTPUT_FILE
  ),
  {
    recursive: true,
  }
)

fs.writeFileSync(
  OUTPUT_FILE,
  output,
  "utf8"
)

// ============================================================
// CONSOLE OUTPUT
// ============================================================

console.log("")
console.log(
  "=========================================="
)

console.log(
  "       PORTFOLIO SCAN COMPLETE"
)

console.log(
  "=========================================="
)

console.log("")

for (
  const project of cleanPortfolio
) {
  console.log(
    `${project.name}: ${project.itemCount} pieces`
  )

  if (project.featured) {
    console.log(
      `  Cover: ${project.featured}`
    )
  } else {
    console.log(
      "  Cover: NOT FOUND"
    )
  }
}

console.log("")

console.log(
  `Generated: ${OUTPUT_FILE}`
)

console.log("")

console.log(
  "Freelance has been excluded."
)

console.log("")