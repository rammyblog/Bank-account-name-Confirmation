import { gCall } from '../test-utils/gCall';
import { Connection } from 'typeorm';
import { testConn } from '../test-utils/testConn';
import { Account } from '../entities/Account';

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
  conn = await testConn(true);
  await conn.close();
});

const accountMutation = `
mutation CreateAccount($user_bank_code: String!, $user_account_name: String!, $user_account_number: String!) {
  createAccount(
    options: {
      user_account_number: $user_account_number,
      user_bank_code: $user_bank_code,
      user_account_name: $user_account_name
    }
  ){
    id
    user_account_number
    user_bank_code
    user_account_name
  }
}

`;

const testAccount = {
  user_account_number: 'Account number',
  user_bank_code: 'Bank code',
  user_account_name: 'Account name',
};

describe('Account', () => {
  it('create account', async () => {
    const { user_account_name, user_account_number, user_bank_code } =
      testAccount;
    const res = await gCall({
      source: accountMutation,
      variableValues: testAccount,
    });
    console.log(res);
    expect(res).toMatchObject({
      data: {
        createAccount: {
          user_account_number,
          user_bank_code,
          user_account_name,
        },
      },
    });

    const dbAccount = await Account.findOne({
      where: {
        user_account_number,
        user_bank_code,
      },
    });
    expect(dbAccount).toBeDefined();
    expect(dbAccount!.user_account_name).toBe(user_account_name);
    expect(dbAccount!.user_account_number).toBe(user_account_number);
    expect(dbAccount!.is_verified).toBe(true);
  });

  it('create account with invalid bank code', async () => {
    const { user_account_number } = testAccount;
    const res = await gCall({
      source: accountMutation,
      variableValues: {
        ...testAccount,
        user_bank_code: '123',
      },
    });
    expect(res.data).toBeNull();
    const dbAccount = await Account.findOne({
      where: {
        user_account_number,
        user_bank_code: '123',
      },
    });
    expect(dbAccount).toBeUndefined();
  });
  it('get account name', async () => {
    const res = await gCall({
      source: `
      query GetAccountName($user_account_number: String!, $user_bank_code: String!) {
        getAccountName(options: {
          user_account_number: $user_account_number,
          user_bank_code: $user_bank_code
        })
      }
      `,
      variableValues: testAccount,
    });
    expect(res).toMatchObject({
      data: {
        getAccountName: 'Onasanya Ignatius Babatunde',
      },
    });
  });
});
