import { StatusModule } from './status/status.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { databaseMongoConfig } from './config/database/database.config';

@Module({
  imports: [
        StatusModule, 
        // MongooseModule.forRoot('mongodb+srv://uttamtwitterdb:iPWOuNrqhPZhnJEQ@cluster0-bigbc.mongodb.net/twitterdb?retryWrites=true&w=majority'),       
        MongooseModule.forRoot(databaseMongoConfig.uri, databaseMongoConfig),
        // MongooseModule.forRoot('mongodb://uttamtwitterdb:iPWOuNrqhPZhnJEQ@cluster0-shard-00-00-bigbc.mongodb.net:27017,cluster0-shard-00-01-bigbc.mongodb.net:27017,cluster0-shard-00-02-bigbc.mongodb.net:27017/twitterdb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'),
        ConfigModule.forRoot(),
        AuthModule
      ],
  controllers: [],
  providers: [],
})
export class AppModule {}
