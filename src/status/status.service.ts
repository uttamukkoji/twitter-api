import { Injectable, NotFoundException } from '@nestjs/common';
import { StatusModel } from './models/status.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class StatusService {
   
    constructor(@InjectModel('StatusModel') private readonly statusModel: Model<StatusModel>, ) {}

    async create(text: string) {
        const statusModel = new this.statusModel({ text: text})
        const statusResult = await statusModel.save()
        return { 
            id: statusResult._id,
            text: statusResult.text,
        };
    } 

    async findAll() {
        const status = await this.statusModel.find().exec();
        return status.map(statusModel => ( 
            {
            id: statusModel._id,
            text: statusModel.text
        })
        );
    }

    async getStatus(id: string) {
        const statusModel = await this.findStatus(id);
        return this.mapStatusModel(statusModel);
    }

    async updateStatus(id: string, text: string) {
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
