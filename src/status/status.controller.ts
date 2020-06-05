import { Controller, Get, Post, Body, Param, Patch, Delete, Query, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDTO } from './dto/create-status.dto';
import { StatusFilterDTO } from './dto/status-filter.dto';
import { StatusIDValidationPipe } from './pipes/status-id-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorators';
import { UserModel } from '../auth/models/user.model';

@Controller('status')
@UseGuards(AuthGuard())
export class StatusController {
    constructor(private readonly statusService: StatusService) {}

    @Post('update')
    @UsePipes(ValidationPipe)
    async createStatus(
        @Body() statusDto: CreateStatusDTO,
        @GetUser() user: UserModel,
        ) {
        return await this.statusService.create(statusDto, user)
    }

    @Get()
    async findAll(
        @Query(ValidationPipe) statusFilterDTO: StatusFilterDTO,
        @GetUser() user: UserModel,
        ) {
        return await this.statusService.findAll(statusFilterDTO, user);
    }

    @Get(':id')
    async fingOne(
        @Param('id', StatusIDValidationPipe) id: string,
        @GetUser() user: UserModel,
        ) {
        return await this.statusService.getStatus(id, user);
    }

    @Patch(':id')
    async updateStatus(
        @Param('id', StatusIDValidationPipe) id: string,
        @Body() statusDto: CreateStatusDTO,
        @GetUser() user: UserModel,
        ) {
        return await this.statusService.updateStatus(id, statusDto, user)
    }

    @Delete(':id')
    async deleteStatus(
        @Param('id', StatusIDValidationPipe) id: string,
        @GetUser() user: UserModel,
        ) {
        return await this.statusService.deleteStatus(id, user)
    }
}
