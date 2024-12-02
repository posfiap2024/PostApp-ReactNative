import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let jwtService: JwtService;
  let guard: AuthGuard;
  let request: any = { headers: {} };
  let context: any = {};

  const user = {
    id: 1,
    username: 'test',
    role: 'admin',
  };

  beforeEach(async () => {
    jwtService = new JwtService({
      secret: 'test',
    });
    guard = new AuthGuard(jwtService);
    context = {
      switchToHttp: () => ({
        getRequest: () => {
          return request;
        },
      }),
    };
  });

  afterEach(() => {
    request = { headers: {} };
  });

  it('should fail when no token is present', () => {
    expect(() => guard.canActivate(context)).rejects.toThrow(
      'You must be logged in to access this resource',
    );
  });

  it('should fail when the token is invalid', async () => {
    request.headers.authorization = 'Bearer invalid';
    expect(() => guard.canActivate(context)).rejects.toThrow('Invalid token');
  });

  it('should validate the token and set the user on the request', async () => {
    const token = jwtService.sign(user);
    request.headers.authorization = `Bearer ${token}`;
    await guard.canActivate(context);
    expect(request.user).toEqual(expect.objectContaining(user));
  });
});
