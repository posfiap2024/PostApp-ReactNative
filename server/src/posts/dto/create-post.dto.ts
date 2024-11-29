import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string(),
  content: z.string(),
  status: z.enum(['published', 'draft']).default('draft'),
  user_id: z.number().optional(),
});

export type CreatePostDto = z.infer<typeof createPostSchema>;
