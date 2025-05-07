import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { IChangePassword, ILogin } from '@vsd-common/lib';

export class LoginDto implements ILogin {
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class ChangePasswordDto implements IChangePassword {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  repeatPassword: string;
}
