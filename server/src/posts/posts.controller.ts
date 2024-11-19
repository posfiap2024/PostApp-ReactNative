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
import { PostsService } from './services/posts.service';
import { createPostSchema, CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto, updatePostSchema } from './dto/update-post.dto';
import { ZodValidationPipe } from '../shared/pipe/zod-validation.pipe';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUser } from '../users/entities/user.interface';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles.enum';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('')
  findAllPublished(
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
  ) {
    return this.postsService.findAllPublished(limit, page);
  }

  @Get('/search')
  search(
    @Query('q') query: string,
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
  ) {
    return this.postsService.search(query, limit, page);
  }

  @Roles(Role.Admin, Role.Professor)
  @UseGuards(AuthGuard, RolesGuard)
  @UsePipes(new ZodValidationPipe({ body: createPostSchema }))
  @Post()
  async create(@Body() body: CreatePostDto, @CurrentUser() user: IUser) {
    return this.postsService.create({
      title: body.title,
      content: body.content,
      status: body.status,
      user,
    });
  }

  @Roles(Role.Admin, Role.Professor)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('admin')
  findAll(@Query('limit') limit: number = 10, @Query('page') page: number = 1) {
    return this.postsService.findAll(limit, page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Roles(Role.Admin, Role.Professor)
  @UseGuards(AuthGuard, RolesGuard)
  @UsePipes(new ZodValidationPipe({ body: updatePostSchema }))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdatePostDto) {
    await this.postsService.update(id, {
      title: body.title,
      content: body.content,
      status: body.status,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.postsService.remove(id);
  }
}
