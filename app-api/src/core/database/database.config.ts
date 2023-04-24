import * as dotenv from 'dotenv';
import {IDatabaseConfig} from './interface/dbConfig.interface';

dotenv.config();

export const databaseConfig: IDatabaseConfig = {
    development: {
        dialect: process.env.DB_DIALECT.toString(),
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME_DEVELOPMENT,
        logging: process.env.DB_LOGGING === 'true' ? console.log : false,
        synchronize: true
    },
    test: {
        dialect: process.env.DB_DIALECT.toString(),
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME_TEST,
        logging: process.env.DB_LOGGING === 'true' ? console.log : false,
        synchronize: true
    },
    production: {
        dialect: process.env.DB_DIALECT.toString(),
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME_PRODUCTION,
        logging: process.env.DB_LOGGING === 'true' ? console.log : false,
        synchronize: true
    },
};