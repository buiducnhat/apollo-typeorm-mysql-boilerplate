import { Field, InputType, ObjectType } from 'type-graphql';
import { MaxLength, MinLength } from 'class-validator';

import { User } from '@src/entities/user.entity';

@ObjectType()
export class RegisterResponseDto {
  @Field()
  token!: string;

  @Field(() => User)
  user!: Partial<User>;
}

@InputType()
export class RegisterInputDto {
  @Field()
  @MinLength(3)
  @MaxLength(50)
  firstName!: string;

  @Field()
  @MinLength(3)
  @MaxLength(50)
  lastName!: string;

  @Field()
  @MinLength(3)
  @MaxLength(255)
  email!: string;

  @Field({ nullable: true })
  @MinLength(10)
  @MaxLength(15)
  phone?: string;

  @Field()
  @MinLength(8)
  password!: string;
}
