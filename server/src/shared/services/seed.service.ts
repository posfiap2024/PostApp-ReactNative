import * as faker from 'faker';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Post } from '../../posts/entities/post.entity';
import { Role } from '../../auth/roles.enum';
import { PasswordHelper } from '../helpers/password.helper';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject('IPasswordHelper')
    private readonly passwordHelper: PasswordHelper,
  ) {}

  async seed() {
    console.log('=======  SEEDING DATABASE =======');
    await this.postRepository.query('TRUNCATE TABLE "posts";');
    await this.userRepository.query(
      'TRUNCATE TABLE "users" RESTART IDENTITY CASCADE;',
    );
    await this.userRepository.save([
      {
        username: 'admin',
        password: await this.passwordHelper.hash('123456'),
        role: Role.Admin,
      },
      {
        username: 'professor',
        password: await this.passwordHelper.hash('123456'),
        role: Role.Professor,
      },
      {
        username: 'student',
        password: await this.passwordHelper.hash('123456'),
        role: Role.Student,
      },
    ]);
    const user = await this.userRepository.findOne({
      where: { role: Role.Professor },
    });
    await this.postRepository.save([
      {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        status: faker.random.arrayElement(['draft', 'published']),
        user,
      },
      {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        status: faker.random.arrayElement(['draft', 'published']),
        user,
      },
      {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        status: faker.random.arrayElement(['draft', 'published']),
        user,
      },
    ]);
    console.log('======= DATABASE SEEDED! =======');
  }
}
