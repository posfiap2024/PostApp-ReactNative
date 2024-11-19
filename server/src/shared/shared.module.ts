import { Module } from '@nestjs/common';
import { PasswordHelper } from './helpers/password.helper';
import { SeedService } from './services/seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Post } from '../posts/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post])],
  providers: [
    {
      provide: 'IPasswordHelper',
      useClass: PasswordHelper,
    },
    SeedService,
  ],
  exports: [
    {
      provide: 'IPasswordHelper',
      useClass: PasswordHelper,
    },
  ],
})
export class SharedModule {}
