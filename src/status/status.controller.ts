import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { StatusService } from './status.service';

@Controller('status')
export class StatusController {
    constructor(private readonly statusService: StatusService) {}

    @Post('update')
    async update(@Body('text') statusText: string) {
        return await this.statusService.create(statusText)
    }

    @Get()
    async findAll() {
        return await this.statusService.findAll();
    }

    @Get(':id')
    async fingOne(@Param('id') id: string) {
        return await this.statusService.getStatus(id)
    }

    @Patch(':id')
    async updateStatus(@Param('id') id: string, @Body('text') statusText: string) {
        return await this.statusService.updateStatus(id, statusText)
    }

    @Delete(':id')
    async deleteStatus(@Param('id') id: string) {
        return await this.statusService.deleteStatus(id)
    }
}
