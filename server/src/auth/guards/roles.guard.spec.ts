import { RolesGuard } from './roles.guard';
import { Reflector } from '@nestjs/core';

describe('RolesGuard', () => {
  const user = {
    id: 1,
    username: 'test',
    role: 'admin',
  };

  let reflector: Reflector;
  let guard: RolesGuard;
  let request: any = {};
  let context: any = {};

  beforeEach(async () => {
    reflector = new Reflector();
    guard = new RolesGuard(reflector);
    context = {
      getHandler: () => {},
      getClass: () => {},
      switchToHttp: () => ({
        getRequest: () => {
          return request;
        },
      }),
    };
  });

  afterEach(() => {
    request = {};
  });

  it('should allow access when no roles are required', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);
    expect(guard.canActivate(context)).toBe(true);
  });

  it('should allow access when the user has the required role', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['admin']);
    request.user = user;
    expect(guard.canActivate(context)).toBe(true);
  });

  it('should deny access when the user does not have the required role', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['student']);
    request.user = user;
    expect(guard.canActivate(context)).toBe(false);
  });

  it('should deny access when the user does not have any roles', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['admin']);
    request.user = {};
    expect(guard.canActivate(context)).toBe(false);
  });
});
