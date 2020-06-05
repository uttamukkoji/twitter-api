import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatusModelSchema } from './models/status.model';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'StatusModel', schema: StatusModelSchema }]),
        AuthModule,
    ],
    controllers: [
        StatusController, ],
    providers: [
        StatusService, ],
})
export class StatusModule {
    
}
