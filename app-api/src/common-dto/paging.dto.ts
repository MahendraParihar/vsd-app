import {IsNotEmpty} from 'class-validator';

export class PagingDto {
    @IsNotEmpty()
    pageNumber: number = 0;
}