import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from './user.interface';
import { Role } from '../../auth/roles.enum';

@Entity({
  name: 'users',
})
export class User implements IUser {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  id?: number;

  @Column({
    name: 'role',
    type: 'varchar',
  })
  role: Role;

  @Column({
    name: 'username',
    type: 'varchar',
    unique: true,
  })
  username: string;

  @Column({
    name: 'password',
    type: 'varchar',
  })
  password: string;
}
