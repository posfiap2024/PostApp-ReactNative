import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IPost, PostStatus } from './post.interface';
import { User } from '../../users/entities/user.entity';

@Entity({
  name: 'posts',
})
export class Post implements IPost {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id?: string | undefined;

  @Column({
    name: 'title',
    type: 'varchar',
  })
  title: string;

  @Column({
    name: 'content',
    type: 'text',
  })
  content: string;

  @Column({
    name: 'status',
    type: 'varchar',
  })
  status: PostStatus = 'draft';

  @ManyToOne(() => User)
  user: User;
}
