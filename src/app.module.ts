import { StatusModule } from './status/status.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
        StatusModule, 
        MongooseModule.forRoot("mongodb://localhost/nest"),
        ConfigModule.forRoot(),
        AuthModule
      ],
  controllers: [],
  providers: [],
})
export class AppModule {}
