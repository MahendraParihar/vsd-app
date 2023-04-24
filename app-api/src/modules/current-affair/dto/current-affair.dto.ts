import {IsNotEmpty} from 'class-validator';

export class CurrentAffairBasicDto {
    @IsNotEmpty()
    currentAffairId: number;
}