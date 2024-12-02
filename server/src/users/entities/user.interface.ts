import { Role } from 'src/auth/roles.enum';

export interface IUser {
  id?: number;
  role: Role;
  username: string;
  password: string;
}
