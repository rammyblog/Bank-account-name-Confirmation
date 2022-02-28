// inconsistency from type orm
module.exports = {
  type: 'postgres',
  synchronize: true,
  logging: true,
  url: process.env.DATABASE_URL,
  entities: ['dist/entities/**/*.js'],
  migrations: ['dist/migration/**/*.js'],
  subscribers: ['dist/subscriber/**/*.js'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
