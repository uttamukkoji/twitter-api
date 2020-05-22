import { StatusModule } from './status/status.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
        StatusModule, 
        MongooseModule.forRoot("mongodb://localhost/nest")
      ],
  controllers: [],
  providers: [],
})
export class AppModule {}
