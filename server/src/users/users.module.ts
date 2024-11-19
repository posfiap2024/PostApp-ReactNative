import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/users.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), SharedModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
