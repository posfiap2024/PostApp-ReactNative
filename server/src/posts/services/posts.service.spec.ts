import { PostsService } from './posts.service';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    service = new PostsService({} as any);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
