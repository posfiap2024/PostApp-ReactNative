import { z } from 'zod';

export const updatePostSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  status: z.enum(['published', 'draft']).optional(),
  user_id: z.number().optional(),
});

export type UpdatePostDto = z.infer<typeof updatePostSchema>;
