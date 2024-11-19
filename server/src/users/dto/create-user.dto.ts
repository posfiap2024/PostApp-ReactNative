import { z } from 'zod';

export const createUserSchema = z.object({
  username: z.string().min(3).max(255),
  password: z.string().min(6),
  role: z.enum(['admin', 'professor', 'student']).default('student'),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
