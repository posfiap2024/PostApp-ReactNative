import { PasswordHelper } from '../../shared/helpers/password.helper';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: any;
  let passwordHelper: PasswordHelper;

  const user = {
    id: 1,
    username: 'test',
    role: 'admin',
    password: '',
  };

  beforeEach(async () => {
    userRepository = { findOne: jest.fn() };
    passwordHelper = new PasswordHelper();
    service = new AuthService(userRepository, passwordHelper);

    user.password = await passwordHelper.hash('test');
  });

  it('validate user password and return it', async () => {
    userRepository.findOne.mockResolvedValue(user);
    const result = await service.signIn('test', 'test');
    expect(result).toEqual(expect.objectContaining(user));
  });

  it('return undefined when password is invalid', async () => {
    userRepository.findOne.mockResolvedValue(user);
    const result = await service.signIn('test', 'invalid');
    expect(result).toBeUndefined();
  });
});
