import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let jwtService: JwtService;
  let controller: AuthController;
  const authService = { signIn: jest.fn() };

  beforeEach(async () => {
    jwtService = new JwtService({ secret: 'test' });
    controller = new AuthController(authService as any, jwtService);
  });

  it('should sign in user', async () => {
    const user = { id: 1, username: 'test', role: 'admin' };
    authService.signIn.mockResolvedValue(user);
    const result = await controller.signIn({
      username: 'test',
      password: 'test',
    });
    expect(result).toEqual({ token: expect.any(String) });
  });

  it('should throw unauthorized exception', async () => {
    authService.signIn.mockResolvedValue(undefined);
    await expect(
      controller.signIn({
        username: 'test',
        password: 'invalid',
      }),
    ).rejects.toThrow('Invalid credentials');
  });
});
