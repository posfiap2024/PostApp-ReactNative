import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/roles.enum';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/services/users.service';
import { UsersController } from 'src/users/users.controller';

describe('UsersControllerTest', () => {
  let userController: UsersController;
  let userService: UsersService;

  const mockUserService = {
    create: jest.fn((dto) => ({ id: 2, ...dto })),
    findAll: jest.fn(() => []),
    findOne: jest.fn((id) => ({ id: id })),
    update: jest.fn((id, dto) => ({ id: id, ...dto })),
    remove: jest.fn(),
  };

  const mockAuthGuard = {
    canActivate: jest.fn(() => true),
  };

  const mockRolesGuard = {
    canActivate: jest.fn(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUserService }],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .overrideGuard(RolesGuard)
      .useValue(mockRolesGuard)
      .compile();

    userController = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should create a user', async () => {
    const dto: CreateUserDto = {
      username: 'Arthur',
      password: '123456',
      role: 'admin',
    };
    expect(await userController.create(dto)).toEqual({
      id: expect.any(Number),
    });
    expect(userService.create).toHaveBeenCalledWith({
      username: dto.username,
      password: dto.password,
      role: Role.Admin,
    });
  });

  it('should find all users', async () => {
    expect(await userController.findAll(10, 1)).toEqual([]);
    expect(userService.findAll).toHaveBeenCalled();
  });

  it('should find one user', async () => {
    const id = 2;
    expect(await userController.findOne(id)).toEqual({
      id: expect.any(Number),
    });
    expect(userService.findOne).toHaveBeenCalledWith(id);
  });

  // it('should update a user', async () => {
  //   const dto: CreateUserDto = {
  //     username: 'Arthur',
  //     password: '123456',
  //     role: 'admin',
  //   };
  //   expect(await userController.update('2', dto)).toEqual({
  //     id: expect.any(Number),
  //   });
  //   expect(userService.update).toHaveBeenCalledWith({
  //     username: dto.username,
  //     password: dto.password,
  //     role: dto.role,
  //   });
  // });

  it('should remove a user', async () => {
    const id = 2;
    await userController.remove(id);
    expect(userService.remove).toHaveBeenCalledWith(id);
  });
});
