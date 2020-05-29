import { Injectable, NotFoundException } from '@nestjs/common';
import { StatusModel } from './models/status.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStatusDTO } from './dto/create-status.dto';
import { StatusFilterDTO } from './dto/status-filter.dto';

@Injectable()
export class StatusService {
   
    constructor(@InjectModel('StatusModel') private readonly statusModel: Model<StatusModel>, ) {}

    async create(createStatusDTO: CreateStatusDTO) {
        const { text } = createStatusDTO

        const statusModel = new this.statusModel({ text: text})
        const statusResult = await statusModel.save()
        return { 
            id: statusResult._id,
            text: statusResult.text,
        };
    } 

    async findAll(statusFilterDTO: StatusFilterDTO) {
        const limit = parseInt(statusFilterDTO.limit) || 10
        const skip = parseInt(statusFilterDTO.skip) || 0
        const query = statusFilterDTO.searchString === undefined ? {} : { text: { $regex: `.*${statusFilterDTO.searchString}*`} }

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

    async getStatus(id: string) {
        const statusModel = await this.findStatus(id);
        return this.mapStatusModel(statusModel);
    }

    async updateStatus(id: string, createStatusDTO: CreateStatusDTO) {
        const { text } = createStatusDTO

        const statusModel = await this.findStatus(id);
        statusModel.text = text;
        const statusResult = await statusModel.save()
        return this.mapStatusModel(statusResult);
    }

    async deleteStatus(id: string) {
        const statusResult = await this.statusModel.deleteOne({ _id: id}).exec()
        if (statusResult.n === 0) {
            throw new NotFoundException('Could not find Status.');
        }
        return {message: 'Status deleted successfully.'}
    }

    private async findStatus(id: string): Promise<StatusModel> {
        const statusModel = await this.statusModel.findById(id)
        console.log(statusModel);
        
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
