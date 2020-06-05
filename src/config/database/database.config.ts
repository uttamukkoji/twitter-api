import * as config from 'config';
import { MongooseModuleOptions } from '@nestjs/mongoose';
require('dotenv').config()
const dbConfig = config.get('db');

export const mongoConfig = {
    host: process.env.DATABASE_HOST || dbConfig.host,
    databse: process.env.DATABASE_NAME || dbConfig.database,
    username: process.env.DATABASE_USERNAME || dbConfig.username,
    password: process.env.DATABASE_PASSWORD || dbConfig.password
}

export const databaseMongoConfig: MongooseModuleOptions = {
    uri: process.env.DB_URI ||  `mongodb+srv://${mongoConfig.username}:${mongoConfig.password}@${mongoConfig.host}/${mongoConfig.databse}?retryWrites=true&w=majority`,
    // uri: process.env.DB_URI || `mongodb://${mongoConfig.username}:${mongoConfig.password}@cluster0-shard-00-00-bigbc.mongodb.net:27017,cluster0-shard-00-01-bigbc.mongodb.net:27017,cluster0-shard-00-02-bigbc.mongodb.net:27017/${mongoConfig.databse}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`
}