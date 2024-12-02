import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPasswordHelper } from '../../shared/helpers/password.interface';
import { User } from '../../users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject('IPasswordHelper')
    private passwordHelper: IPasswordHelper,
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    const isPasswordValid = await this.passwordHelper.compare(
      password,
      user?.password,
    );
    if (!isPasswordValid) {
      return undefined;
    }
    delete user.password;
    return user;
  }
}
