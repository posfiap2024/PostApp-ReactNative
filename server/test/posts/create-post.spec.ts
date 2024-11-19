import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from 'src/posts/posts.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { IPost } from 'src/posts/entities/post.interface';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Injectable, CanActivate } from '@nestjs/common';
import { of } from 'rxjs';
import { PostsService } from 'src/posts/services/posts.service';

@Injectable()
class MockAuthGuard implements CanActivate {
  canActivate() {
    return of(true);
  }
}

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useValue: {}, // Mock PostRepository
        },
        {
          provide: JwtService,
          useValue: {},
        },
        {
          provide: AuthGuard('jwt'),
          useClass: MockAuthGuard,
        },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);
  });

  it('should return a post by id', async () => {
    const post: IPost = {
      id: '1',
      title: 'Post Title',
      content: 'Post Content',
      status: 'draft',
      user: null,
    };
    jest.spyOn(service, 'findOne').mockResolvedValue(post as any);
    const result = await controller.findOne('1');
    expect(result).toEqual(post);
  });
});
