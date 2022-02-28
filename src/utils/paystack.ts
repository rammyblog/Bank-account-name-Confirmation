import fetch from 'node-fetch';
import { BankDataResponse } from '../types/account.types';

export const getAccountNameFromPaystack = async (
  accountNumber: string,
  bankCode: string
): Promise<string> => {
  try {
    const res = await fetch(
      `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );
    const data = await res.json();
    if (data.status && data.message === 'Account number resolved') {
      return data.data.account_name;
    }
    throw new Error('Unable to resolve account name');
  } catch (error) {
    throw new Error('Unable to resolve account name');
  }
};

export const getAllBankData = async () => {
  try {
    const res = await fetch(`https://api.paystack.co/bank`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });
    const data: BankDataResponse = await res.json();
    if (data.status && data.message === 'Banks retrieved') {
      return data;
    }
    throw new Error('Unable to retrieve banks');
  } catch (error) {
    throw new Error('Unable to retrieve banks');
  }
};
