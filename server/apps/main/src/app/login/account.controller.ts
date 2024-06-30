import { Body, Controller, Get, Post } from '@nestjs/common';
import { AdminUserService, CurrentUser, Public } from '@server/common';
import { LoginDto } from './dto/login.dto';
import { IAuthUser } from '@vsd-common/lib';

@Controller('account')
export class AccountController {
  constructor(private adminUserService: AdminUserService) {}

  @Public()
  @Post('sign-in')
  login(@Body() login: LoginDto): Promise<{ token: string }> {
    return this.adminUserService.login(login);
  }

  @Get('profile')
  getProfile(@CurrentUser() currentUser: IAuthUser) {
    return this.adminUserService.getById(currentUser.adminUserId);
  }
}
