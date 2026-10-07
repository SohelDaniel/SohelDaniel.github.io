import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One markdown file per project in src/content/projects/.
const projects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			blurb: z.string(),
			tech: z.array(z.string()),
			year: z.string(),
			order: z.number().default(99),
			repo: z.string().url().optional(),
			demo: z.string().url().optional(),
			// YouTube video id of the "watch the build" video, once it exists
			video: z.string().optional(),
			cover: image(),
			coverAlt: z.string(),
			// short looping clip in public/media (name without extension)
			clip: z.string().optional(),
			stats: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
			gallery: z.array(z.object({ src: image(), alt: z.string(), caption: z.string().optional() })).default([]),
		}),
});

export const collections = { projects };
