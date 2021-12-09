import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column({ nullable: true })
  avatar_url: string;

  @Column({ nullable: true })
  gravatar_id: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  organizations_url: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  company: string;

  @Column({ nullable: true })
  blog: string;

  @Column({ nullable: true })
  twitter_username: string;

  @Column({ nullable: true })
  public_repos: number;

  @Column({ nullable: true })
  followers: number;

  @Column({ nullable: true })
  following: number;

  @Column({ nullable: true })
  created_at: string;

  @Column({ nullable: true })
  total_private_repos: number;
}
