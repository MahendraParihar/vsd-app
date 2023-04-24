import {Body, Controller, Get, Post, Req} from '@nestjs/common';
import {AccountService} from './account.service';
import {AdminUserDTO, AuthAdminUserDTO, AuthAdminUserIdDTO, AuthAdminUserResetPasswordDTO} from './dto/admin-user.dto';
import {CryptoUtil} from "../../util/crypto-util";

@Controller('account')
export class AccountController {
  ip = '1:1:1:1';

  constructor(private readonly accountService: AccountService) {
  }

  @Post('sign-in')
  async signIn(@Body() req: AuthAdminUserDTO) {
    const cIp = '1:1:1:1';
    const tempUser: AuthAdminUserDTO = req;
    tempUser.emailId = CryptoUtil.decryptUsingAES256(tempUser.emailId);
    tempUser.password = CryptoUtil.decryptUsingAES256(tempUser.password);
    return await this.accountService.login(tempUser, cIp);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('sign-up')
  async signUp(@Body() req: AdminUserDTO) {
    const tempUser: AdminUserDTO = req;
    tempUser.createdIp = '1:1:1:1';
    tempUser.modifiedIp = '1:1:1:1';
    tempUser.emailId = CryptoUtil.decryptUsingAES256(tempUser.emailId);
    tempUser.password = CryptoUtil.decryptUsingAES256(tempUser.password);
    return await this.accountService.signUp(tempUser);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('verify-account')
  async verifyAccount(@Req() req) {
    console.log(req.query.token);
    return await this.accountService.verifyAccount(req.query.token, this.ip);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('resend-verification-link')
  async resendVerificationLink(@Body() req: AuthAdminUserIdDTO) {
    const tempUser: AuthAdminUserIdDTO = req;
    tempUser.emailId = CryptoUtil.decryptUsingAES256(tempUser.emailId);
    return await this.accountService.resendVerificationOtp(tempUser, this.ip);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('send-forgot-password-otp')
  async sendForgotPasswordOtp(@Body() req: AuthAdminUserIdDTO) {
    const tempUser: AuthAdminUserIdDTO = req;
    tempUser.emailId = CryptoUtil.decryptUsingAES256(tempUser.emailId);
    return await this.accountService.sendForgotPasswordOtp(tempUser, this.ip);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('reset-password')
  async resetPassword(@Body() req: AuthAdminUserResetPasswordDTO) {
    const tempUser: AuthAdminUserResetPasswordDTO = req;
    tempUser.emailId = CryptoUtil.decryptUsingAES256(tempUser.emailId);
    tempUser.password = CryptoUtil.decryptUsingAES256(tempUser.password);
    tempUser.repeatPassword = CryptoUtil.decryptUsingAES256(tempUser.repeatPassword);
    return await this.accountService.resetPassword(tempUser, this.ip);
  }
}
