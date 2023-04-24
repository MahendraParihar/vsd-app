import {IsNotEmpty} from 'class-validator';

export class EventBasicDto {
    @IsNotEmpty()
    eventId: number;
}

export class EventInterestedFlagDto extends EventBasicDto {
    @IsNotEmpty()
    appUserId: number;

    @IsNotEmpty()
    flag: boolean;
}