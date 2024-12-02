import { PostsService } from './services/posts.service';
import { PostsController } from './posts.controller';

describe('PostsController', () => {
  let controller: PostsController;

  beforeEach(async () => {
    controller = new PostsController(new PostsService({} as any));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
