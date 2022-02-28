import { Max, Min } from 'class-validator';
import { Field, InputType, ObjectType } from 'type-graphql';

@InputType()
export class AccountCreateInput {
  @Field()
  @Max(10)
  user_account_number: string;

  @Field()
  @Min(2)
  user_bank_code: string;

  @Field()
  @Min(2)
  user_account_name: string;
}

@InputType()
export class AccountNameCheckerInput {
  @Field()
  @Max(10)
  user_account_number: string;

  @Field()
  @Min(2)
  user_bank_code: string;
}

@ObjectType()
export class BankDataResponse {
  @Field({ nullable: true })
  status?: boolean;

  @Field()
  message: string;

  @Field(() => [BankData])
  data: BankData[];
}

@ObjectType()
class BankData {
  @Field()
  name: string;
  @Field()
  slug: string;
  @Field()
  code: string;
  @Field()
  longcode: string;
  @Field()
  gateway: string;
  @Field()
  pay_with_bank: boolean;
  @Field()
  active: boolean;
  @Field()
  is_deleted: boolean;
  @Field()
  country: string;
  @Field()
  currency: string;
  @Field()
  type: string;
  @Field()
  id: number;
  @Field()
  createdAt: string;
  @Field()
  updatedAt: string;
}
