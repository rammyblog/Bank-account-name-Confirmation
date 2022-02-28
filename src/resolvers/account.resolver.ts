import levenshtein from 'js-levenshtein';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Account } from '../entities/Account';
import {
  AccountCreateInput,
  AccountNameCheckerInput,
  BankDataResponse,
} from '../types/account.types';
import toTitleCase from '../utils/convertToTitleCase';
import { getAccountNameFromPaystack, getAllBankData } from '../utils/paystack';

@Resolver(Account)
export class AccountResolver {
  @Query(() => [Account])
  accounts() {}

  @Mutation(() => Account)
  async createAccount(
    @Arg('options')
    {
      user_bank_code,
      user_account_name,
      user_account_number,
    }: AccountCreateInput
  ): Promise<Account | null> {
    const bankDataName = await getAccountNameFromPaystack(
      user_account_number,
      user_bank_code
    );
    const isExist = await Account.findOne({
      where: {
        user_account_number,
        user_bank_code,
      },
    });
    if (isExist) {
      throw new Error('Account already exist');
    }
    if (
      bankDataName.toLowerCase() === user_account_name.toLowerCase() ||
      levenshtein(
        bankDataName.toLowerCase(),
        user_account_name.toLowerCase()
      ) <= 2
    ) {
      const account = Account.create({
        user_account_name,
        user_account_number,
        user_bank_code,
        is_verified: true,
      });
      await account.save();
      return account;
    }
    throw new Error('Unable to verify account name');
  }

  @Query(() => String)
  async getAccountName(
    @Arg('options')
    { user_account_number, user_bank_code }: AccountNameCheckerInput
  ): Promise<string> {
    const accountFromDb = await Account.findOne({
      where: {
        user_account_number,
        user_bank_code,
      },
    });
    if (accountFromDb) {
      return toTitleCase(accountFromDb.user_account_name);
    }
    const accountName = await getAccountNameFromPaystack(
      user_account_number,
      user_bank_code
    );
    return toTitleCase(accountName);
  }

  @Query(() => BankDataResponse)
  async getBankData() {
    const banks = await getAllBankData();
    return banks;
  }
}
