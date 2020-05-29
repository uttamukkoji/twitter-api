import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDTO } from './dto/create-status.dto';
import { StatusFilterDTO } from './dto/status-filter.dto';

@Controller('status')
export class StatusController {
    constructor(private readonly statusService: StatusService) {}

    @Post('update')
    async createStatus(@Body() statusDto: CreateStatusDTO) {
        return await this.statusService.create(statusDto)
    }

    @Get()
    async findAll(@Query() statusFilterDTO: StatusFilterDTO) {
        return await this.statusService.findAll(statusFilterDTO);
    }

    @Get(':id')
    async fingOne(@Param('id') id: string) {
        return await this.statusService.getStatus(id)
    }

    @Patch(':id')
    async updateStatus(@Param('id') id: string, @Body() statusDto: CreateStatusDTO) {
        return await this.statusService.updateStatus(id, statusDto)
    }

    @Delete(':id')
    async deleteStatus(@Param('id') id: string) {
        return await this.statusService.deleteStatus(id)
    }
}
