import {IsNotEmpty, MaxLength} from 'class-validator';

export class AppUserLoginOtpDto {
    @IsNotEmpty()
    appUserId: number;

    @MaxLength(6)
    verificationCode: string;

    @MaxLength(50)
    createdIp: string;
}
