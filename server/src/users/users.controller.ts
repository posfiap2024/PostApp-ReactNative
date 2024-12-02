import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  UseGuards,
} from '@nestjs/common';

import { IUser } from './entities/user.interface';
import { Role } from '../auth/roles.enum';
import { UsersService } from './services/users.service';
import { ZodValidationPipe } from '../shared/pipe/zod-validation.pipe';
import { CreateUserDto, createUserSchema } from './dto/create-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @UsePipes(new ZodValidationPipe({ body: createUserSchema }))
  @Post()
  async create(@Body() body: CreateUserDto) {
    const role = this.getRole(body.role);
    const user = await this.usersService.create({
      username: body.username,
      password: body.password,
      role,
    });
    return { id: user.id };
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  findAll(
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
    @Query('role') role: string = null,
  ) {
    return this.usersService.findAll(limit, page, role as Role);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  // @UsePipes(new ZodValidationPipe({ body: updatePostSchema }))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() user: IUser) {
    await this.usersService.update(id, user);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.usersService.remove(id);
  }

  private getRole(role: string) {
    switch (role) {
      case 'admin':
        return Role.Admin;
      case 'professor':
        return Role.Professor;
      case 'student':
        return Role.Student;
    }
  }
}
