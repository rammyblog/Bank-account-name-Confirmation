## Technologies used

- Typescript
- GraphQL
- Apollo Server
- Express
- Postgres
- TypeORM
- Type graphQL

## Install

```sh
npm install
```

## Usage

> To get this project running perfectly on your local, ensure you follow the instructions below.

1. Create a .env file in the root directory.
2. In the .env file ensure you have the following setup.

```
DATABASE_URL=DB URL i.e postgres://postgres:test@localhost:5432/bank_accounts
PORT=your preferred port
PAYSTACK_SECRET_KEY=paystack secret key
```

3. Run the following npm command below

```sh
npm run watch
```

```sh
npm run dev
```

4. Visit http://localhost:<PORT>/graphql to perform queries and mutations.

## Run tests

To Run the tests, run the following npm command
Input your paystack secret key in the jest.config.js file

```sh
npm run test
```

- In 100 words or less, provide an answer to this in your readme: What's a good reason why the pure Levenshtein Distance algorithm might be a more effective solution than the broader Damerau–Levenshtein Distance algorithm in this specific scenario.

* In Damerau's paper considered only misspellings that could be corrected with at most one edit operation. Which means it can only work if the edit distance is at most one. While this is not true for the Levenshtein Distance.

## Author

👤 **Onasanya Tunde**

- Website: https://onasanyatunde.codes
- Twitter: [@simply_rammy](https://twitter.com/simply_rammy)
- Github: [@rammyblog](https://github.com/rammyblog)
- LinkedIn: [@onasanya-tunde](https://linkedin.com/in/onasanya-tunde)
