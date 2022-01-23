import { Field, InputType, ObjectType } from 'type-graphql';
import { MaxLength, MinLength } from 'class-validator';

import { User } from '@src/entities/user.entity';

@ObjectType()
export class LoginResponseDto {
  @Field()
  token!: string;

  @Field(() => User)
  user!: Partial<User>;
}

@InputType()
export class LoginInputDto {
  @Field()
  @MinLength(3)
  @MaxLength(255)
  email!: string;

  @Field()
  @MinLength(8)
  password!: string;

  @Field({ nullable: true, defaultValue: false })
  remember: boolean;
}
