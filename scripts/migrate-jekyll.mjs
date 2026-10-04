import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const root = process.cwd();

const postsDir = path.join(root, "src/content/._posts");
const assetsDir = path.join(root, "src/content/.assets");

const blogDir = path.join(root, "src/content/blog");
const publicAssetsDir = path.join(root, "public/assets");

function mkdir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyDirectory(src, dest) {
  if (!fs.existsSync(src)) return;

  mkdir(dest);

  for (const item of fs.readdirSync(src, { withFileTypes: true })) {
    const source = path.join(src, item.name);
    const target = path.join(dest, item.name);

    if (item.isDirectory()) {
      copyDirectory(source, target);
    } else {
      fs.copyFileSync(source, target);
    }
  }
}

function parseFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);

  if (!match) {
    return {
      frontmatter: {},
      body: content,
    };
  }

  const raw = match[1];
  const body = content.slice(match[0].length);

  const data = {};

  for (const line of raw.split("\n")) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);

    if (!match) continue;

    const key = match[1];
    let value = match[2].trim();

    // Remove quotes
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    // Arrays
    if (value.startsWith("[") && value.endsWith("]")) {
      value = value
        .slice(1, -1)
        .split(",")
        .map(x => x.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    }

    data[key] = value;
  }

  return { frontmatter: data, body };
}

function yamlString(value) {
  return `"${String(value)
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')}"`;
}

function yamlArray(values) {
  return `[${values.map(yamlString).join(", ")}]`;
}

function convertPost(filename) {
  const sourcePath = path.join(postsDir, filename);
  const original = fs.readFileSync(sourcePath, "utf8");

  const { frontmatter, body } = parseFrontmatter(original);

  const baseName = filename
    .replace(/^\d{4}-\d{1,2}-\d{1,2}-/, "")
    .replace(/\.md$/, "");

  const outputPath = path.join(blogDir, `${baseName}.md`);

  // Don't overwrite posts already migrated/created in Astro.
  if (fs.existsSync(outputPath)) {
    console.log(`SKIP  ${baseName}.md already exists`);
    return;
  }

  let title =
    frontmatter.title ||
    baseName
      .replace(/-/g, " ")
      .replace(/\b\w/g, c => c.toUpperCase());

  let description =
    frontmatter.description ||
    frontmatter.excerpt ||
    "";

  let date = frontmatter.date;

  // Extract date from filename if necessary.
  if (!date) {
    const dateMatch = filename.match(/^(\d{4}-\d{1,2}-\d{1,2})/);
    date = dateMatch ? dateMatch[1] : "2025-01-01";
  }

  // Convert common Jekyll image paths.
  let convertedBody = body
    .replace(/\{\{\s*site\.baseurl\s*\}\}/g, "")
    .replace(/\{\{\s*site\.url\s*\}\}/g, "")
    .replace(/\{\{\s*relative_url\s*\}\}/g, "")
    .replace(/\{\{\s*site\.assets\s*\}\}/g, "/assets")
    .replace(/\/assets\/img\//g, "/assets/img/")
    .replace(/\/assets\/images\//g, "/assets/images/");

  // Jekyll Liquid image syntax -> normal Markdown image syntax
  convertedBody = convertedBody.replace(
    /\{\{\s*['"]([^'"]+)['"]\s*\|\s*relative_url\s*\}\}/g,
    "$1"
  );

  const tags = Array.isArray(frontmatter.tags)
    ? frontmatter.tags
    : [];

  const project = frontmatter.project;

  let output = `---
title: ${yamlString(title)}
description: ${yamlString(description)}
date: ${date}
tags: ${yamlArray(tags)}
`;

  if (project) {
    output += `project: ${yamlString(project)}
`;
  }

  output += `---

${convertedBody.trim()}
`;

  fs.writeFileSync(outputPath, output);

  console.log(`MIGRATE ${filename} -> blog/${baseName}.md`);
}

console.log("\n=== Jekyll → Astro migration ===\n");

// ------------------------------------------------------------
// 1. Copy assets
// ------------------------------------------------------------

console.log("Copying assets...");

copyDirectory(
  path.join(assetsDir, "images"),
  path.join(publicAssetsDir, "images")
);

copyDirectory(
  path.join(assetsDir, "img"),
  path.join(publicAssetsDir, "img")
);

copyDirectory(
  path.join(assetsDir, "pdf"),
  path.join(publicAssetsDir, "pdf")
);

console.log("Assets copied.\n");

// ------------------------------------------------------------
// 2. Migrate posts
// ------------------------------------------------------------

mkdir(blogDir);

if (!fs.existsSync(postsDir)) {
  console.log("No ._posts directory found.");
} else {
  const posts = fs
    .readdirSync(postsDir)
    .filter(file => file.endsWith(".md"))
    .sort();

  console.log(`Found ${posts.length} Jekyll posts.\n`);

  for (const post of posts) {
    convertPost(post);
  }
}

// ------------------------------------------------------------
// 3. Build Astro
// ------------------------------------------------------------

console.log("\nRunning Astro build...\n");

try {
  execSync("npm run build", {
    cwd: root,
    stdio: "inherit",
  });

  console.log("\n✓ Astro build succeeded.");
} catch {
  console.error("\n✗ Astro build failed.");
  console.error(
    "The migrated files were kept so you can inspect the error."
  );
  process.exit(1);
}

console.log(`
==================================================
Migration complete.

Old Jekyll files were NOT deleted.

Posts:
  src/content/blog/

Assets:
  public/assets/

Next:
  npm run dev
==================================================
`);