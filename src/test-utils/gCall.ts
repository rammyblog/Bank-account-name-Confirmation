import { graphql, GraphQLSchema } from 'graphql';
import { buildSchema, Maybe } from 'type-graphql';
import { AccountResolver } from '../resolvers/account.resolver';

interface Props {
  source: string;
  variableValues?: Maybe<{ [key: string]: any }>;
}

let schema: GraphQLSchema;

export const gCall = async ({ source, variableValues }: Props) => {
  if (!schema) {
    schema = await buildSchema({
      resolvers: [AccountResolver],
      validate: false,
    });
  }
  return graphql({
    schema,
    source,
    variableValues,
  });
};
