import { createConnection } from 'typeorm';

export const testConn = (drop: boolean = false) => {
  return createConnection({
    name: 'default',
    type: 'postgres',
    synchronize: true,
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'test',
    database: 'bank_accounts_test',
    entities: [__dirname + '/../entities/*.*'],
    migrations: ['../migration/**/*.ts'],
    subscribers: ['../subscriber/**/*.ts'],
    dropSchema: drop,
  });
};
