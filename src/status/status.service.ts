import { Injectable, NotFoundException } from '@nestjs/common';
import { StatusModel } from './models/status.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, mongo } from 'mongoose';
import { CreateStatusDTO } from './dto/create-status.dto';
import { StatusFilterDTO } from './dto/status-filter.dto';
import { UserModel } from '../auth/models/user.model';

@Injectable()
export class StatusService {
   
    constructor(@InjectModel('StatusModel') private readonly statusModel: Model<StatusModel>, ) {}

    async create(createStatusDTO: CreateStatusDTO, user: UserModel) {
        const { text } = createStatusDTO

        const statusModel = new this.statusModel()
        statusModel.text = text;
        statusModel.user= user;
        const statusResult = await statusModel.save()
        return { 
            id: statusResult._id,
            text: statusResult.text,
        };
    } 

    async findAll(statusFilterDTO: StatusFilterDTO, user: UserModel) {
        const limit = parseInt(statusFilterDTO.limit) || 10
        const skip = parseInt(statusFilterDTO.skip) || 0
        const query = statusFilterDTO.searchString === undefined ? { 'user._id': user._id } : { text: { $regex: `.*${statusFilterDTO.searchString}*`}, 'user._id': user._id }
        
        const count = await this.statusModel.countDocuments(query).exec();
        const status = await this.statusModel.find(query).limit(limit).skip(skip).exec();
        const statusJson = status.map(statusModel => ( 
            {
            id: statusModel._id,
            text: statusModel.text
        }));
        return {
            status: statusJson,
            count: count
        }
    }

    async getStatus(id: string, user: UserModel) {
        const statusModel = await this.findStatus(id, user);
        return this.mapStatusModel(statusModel);
    }

    async updateStatus(id: string, createStatusDTO: CreateStatusDTO, user: UserModel) {
        const { text } = createStatusDTO

        const statusModel = await this.findStatus(id, user);
        statusModel.text = text;
        const statusResult = await statusModel.save()
        return this.mapStatusModel(statusResult);
    }

    async deleteStatus(id: string, user: UserModel) {
        const statusResult = await this.statusModel.deleteOne({ _id: id, 'user._id': user._id }).exec()
        if (statusResult.n === 0) {
            throw new NotFoundException('Could not find Status.');
        }
        return {message: 'Status deleted successfully.'}
    }

    private async findStatus(id: string, user: UserModel): Promise<StatusModel> {
        const statusModel = await this.statusModel.findOne( { _id: id, 'user._id': user._id })
        
        if (!statusModel) {
            throw new NotFoundException('Could not find Status.');
        }
        return statusModel
    }

    private mapStatusModel(statusResult: StatusModel) {
        return { 
            id: statusResult._id,
            text: statusResult.text,
        }
    }
}
