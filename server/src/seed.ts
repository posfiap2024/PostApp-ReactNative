import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedService } from './shared/services/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const seeder = app.get(SeedService);
  await seeder.seed();
  await app.close();
}
bootstrap();
