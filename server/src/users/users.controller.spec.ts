import { UsersController } from './users.controller';
import { UsersService } from './services/users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    controller = new UsersController(new UsersService({} as any, {} as any));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
