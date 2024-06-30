import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ILogin } from '@vsd-common/lib';

export class LoginDto implements ILogin {
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
