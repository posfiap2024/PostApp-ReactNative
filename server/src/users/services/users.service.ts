import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { IUser } from '../entities/user.interface';
import { Repository } from 'typeorm';
import { IPasswordHelper } from 'src/shared/helpers/password.interface';
import { Role } from 'src/auth/roles.enum';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IPasswordHelper') private passwordHelper: IPasswordHelper,
    @InjectRepository(User) private repository: Repository<User>,
  ) {}

  async create(user: IUser) {
    user.password = await this.passwordHelper.hash(user.password);
    return this.repository.save(user);
  }

  async findAll(limit: number, page: number, role?: Role) {
    const query = this.repository
      .createQueryBuilder('user')
      .skip((page - 1) * limit)
      .take(limit)
      .select(['user.id', 'user.username', 'user.role']);
    
    if (role) {
      query.where('user.role = :role', { role });
    }
  
    const _users = await query.getMany();
    return _users.sort((a, b) => a.id - b.id);
  }

  async findOne(id: number) {
    return this.repository.findOne({
      where: { id },
      select: ['id', 'username', 'role'],
    });
  }

  async update(id: string, user: Partial<IUser>) {
    console.log('updating::', id);
    console.log('updating::', user);
    if (user.password) {
      user.password = await this.passwordHelper.hash(user.password);
    }
    return this.repository
    .createQueryBuilder()
    .update(User)
    .set(user)
    .where("id = :id", { id })
    .execute();
  }

  async remove(id: number) {
    return this.repository.delete(id);
  }
}
