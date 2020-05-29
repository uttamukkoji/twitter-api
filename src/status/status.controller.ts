import { Controller, Get, Post, Body, Param, Patch, Delete, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDTO } from './dto/create-status.dto';
import { StatusFilterDTO } from './dto/status-filter.dto';
import { StatusIDValidationPipe } from './pipes/status-id-validation.pipe';

@Controller('status')
export class StatusController {
    constructor(private readonly statusService: StatusService) {}

    @Post('update')
    @UsePipes(ValidationPipe)
    async createStatus(@Body() statusDto: CreateStatusDTO) {
        return await this.statusService.create(statusDto)
    }

    @Get()
    async findAll(@Query(ValidationPipe) statusFilterDTO: StatusFilterDTO) {
        return await this.statusService.findAll(statusFilterDTO);
    }

    @Get(':id')
    async fingOne(@Param('id', StatusIDValidationPipe) id: string) {
        return await this.statusService.getStatus(id)
    }

    @Patch(':id')
    async updateStatus(@Param('id', StatusIDValidationPipe) id: string, @Body() statusDto: CreateStatusDTO) {
        return await this.statusService.updateStatus(id, statusDto)
    }

    @Delete(':id')
    async deleteStatus(@Param('id', StatusIDValidationPipe) id: string) {
        return await this.statusService.deleteStatus(id)
    }
}
