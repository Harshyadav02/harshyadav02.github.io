import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      author: z.string().default('Harsh Yadav'),
      // Set when the post was first published elsewhere (e.g. the CloudRaft blog)
      // so search engines credit the original instead of flagging duplicate content.
      canonicalUrl: z.url().optional(),
      heroImage: image().optional(),
    }),
});

export const collections = { blog };
