import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { Max, Min } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';

@Entity()
@ObjectType()
export class Account extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  @Max(10)
  user_account_number!: string;

  @Field()
  @Column()
  @Min(2)
  user_bank_code!: string;

  @Field()
  @Column()
  @Min(2)
  user_account_name!: string;

  @Field()
  @Column()
  is_verified: boolean;

  @CreateDateColumn()
  createdAt = new Date();

  @UpdateDateColumn()
  updatedAt = new Date();
}
