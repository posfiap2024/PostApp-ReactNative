import { IUser } from 'src/users/entities/user.interface';

export interface IPost {
  id?: string;
  title: string;
  content: string;
  status?: PostStatus;
  user?: IUser;
}

export type PostStatus = 'published' | 'draft';
