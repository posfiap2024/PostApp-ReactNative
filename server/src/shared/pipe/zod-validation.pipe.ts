import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schemas: ZodValidationSchemas) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    const schema = this.getValidationSchema(
      metadata.type as ZodValidationSchemaTypes,
    );

    if (!schema) return value;

    try {
      const parsedValue = schema.parse(value);
      return parsedValue;
    } catch (error) {
      switch (true) {
        case error.message.includes("String must contain at least 6 character(s)"):
          throw new BadRequestException('Senha deve conter no mínimo 6 caracteres');
          
        case error.message.includes("String must contain at least 3 character(s)"):
          throw new BadRequestException('Nome do usuário deve conter no mínimo 3 caracteres');
    
        default:
          throw new BadRequestException(error.message);
      }
    }
  }

  private getValidationSchema(type: ZodValidationSchemaTypes) {
    return this.schemas[type];
  }
}

type ZodValidationSchemaTypes = 'body' | 'param' | 'query';

type ZodValidationSchemas = {
  [key in ZodValidationSchemaTypes]?: ZodSchema;
};
