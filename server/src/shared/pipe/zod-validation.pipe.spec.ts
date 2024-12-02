import { z } from 'zod';
import { ZodValidationPipe } from './zod-validation.pipe';

describe('ZodValidatorPipe', () => {
  it('should be defined', () => {
    expect(
      new ZodValidationPipe({
        body: z.object({}),
        param: z.object({}),
        query: z.object({}),
      }),
    ).toBeDefined();
  });
});
