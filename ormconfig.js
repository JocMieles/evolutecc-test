module.exports = {
    type: 'postgres',
    host: `${process.env.PGSQL_HOST || 'localhost'}`,
    port: parseFloat(`${process.env.PGSQL_PORT || '5432'}`),
    username: `${process.env.PGSQL_USERNAME || 'postgres'}`,
    password: `${process.env.PGSQL_PASSWORD || 'postgres'}`,
    database: `${process.env.PGSQL_DATABASE || 'postgres'}`,
    autoLoadEntities: true,
    synchronize: true,
}