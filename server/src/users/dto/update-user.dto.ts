import { z } from 'zod';

export const createUserSchema = z.object({
  username: z.string().min(3).max(255).optional(),
  password: z.string().min(6).optional(),
  role: z.enum(['admin', 'professor', 'student']).optional(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
