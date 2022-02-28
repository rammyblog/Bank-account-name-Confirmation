/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
process.env = Object.assign(process.env, {
  PAYSTACK_SECRET_KEY: 'PAYSTACK SECRET KEY',
});
