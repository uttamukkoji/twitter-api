import { StatusModule } from './status/status.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { databaseMongoConfig } from './config/database/database.config';

@Module({
  imports: [
        StatusModule, 
        MongooseModule.forRoot(databaseMongoConfig.uri),
        ConfigModule.forRoot(),
        AuthModule
      ],
  controllers: [],
  providers: [],
})
export class AppModule {}
