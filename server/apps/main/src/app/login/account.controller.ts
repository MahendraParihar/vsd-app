import { Body, Controller, Get, Post } from '@nestjs/common';
import { AdminUserService, CurrentUser, Public } from '@server/common';
import { LoginDto } from './dto/login.dto';
import { IAuthUser } from '@vsd-common/lib';

@Controller('account')
export class AccountController {
  constructor(private adminUserService: AdminUserService) {
  }

  @Public()
  @Post('sign-in')
  async login(@Body() login: LoginDto): Promise<{ accessToken: string, refreshToken: string }> {
    return await this.adminUserService.login(login);
  }


  @Public()
  @Post('refresh-token')
  async refresh(@Body() body: { refreshToken: string }): Promise<{ accessToken: string }> {
    return await this.adminUserService.refreshToken(body.refreshToken);
  }

  @Get('profile')
  async getProfile(@CurrentUser() currentUser: IAuthUser) {
    return await this.adminUserService.getById(currentUser.adminUserId);
  }
}
