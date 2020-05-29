import { IsNotEmpty } from 'class-validator'

export class CreateStatusDTO {
    @IsNotEmpty()
    text: string;
}