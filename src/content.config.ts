import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/projects',
  }),

  schema: z.object({
    title: z.string(),
    number: z.string(),
    description: z.string(),
    category: z.string(),
    status: z.enum([
      'active',
      'complete',
      'experiment',
      'archived',
      'abandoned',
    ]),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    image: z.string().optional(),
    technologies: z.array(z.string()).default([]),
    specs: z.record(z.string(), z.string()).default({}),
  }),
});

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/blog',
  }),

  schema: z.object({
    title: z.string(),
    description: z.string().default(''),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    project: z.string().optional(),
    draft: z.boolean().default(false),
    image: z.string().optional(),
  }),
});

export const collections = {
  projects,
  blog,
};