import {IsEmail, IsNotEmpty, MaxLength} from 'class-validator';

export class AuthAppUserIdDTO {
    @MaxLength(100)
    readonly userId: string;
}

export class AuthAppUserDTO extends AuthAppUserIdDTO {
    @IsNotEmpty()
    @MaxLength(6)
    readonly otp: string;
}

export class AppUserDTO {
    @IsNotEmpty()
    @MaxLength(50)
    readonly firstName: string;

    @IsNotEmpty()
    @MaxLength(50)
    readonly lastName: string;

    @IsNotEmpty()
    readonly cityVillageId: number;

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(100)
    readonly emailId: string;

    @MaxLength(16)
    password: string;

    @IsNotEmpty()
    @MaxLength(16)
    readonly contactNo: string;

    @MaxLength(6)
    verificationCode: string;

    @MaxLength(50)
    createdIp: string;

    @MaxLength(50)
    modifiedIp: string;
}
