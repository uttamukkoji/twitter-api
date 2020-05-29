import { IsNotEmpty, IsOptional } from 'class-validator';
export class StatusFilterDTO {
    @IsOptional()
    @IsNotEmpty()
    searchString: string;
 
    @IsOptional()
    skip: string;
 
    @IsOptional()
    limit: string;
}