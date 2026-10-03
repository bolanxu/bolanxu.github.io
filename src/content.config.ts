import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    number: z.string(),
    description: z.string(),
    category: z.string(),
    status: z.enum(['active', 'complete', 'experiment', 'archived', 'abandoned']),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    image: z.string().optional(),
    technologies: z.array(z.string()).default([]),
    specs: z.record(z.string(), z.string()).default({}),
  })
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    project: z.string().optional(),
    draft: z.boolean().default(false),
  })
});

export const collections = { projects, blog };
