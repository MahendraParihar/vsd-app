import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {AccountService} from './account.service';
import {AppUserDTO, AuthAppUserDTO} from './dto/app-user.dto';
import {JwtAuthGuard} from './jwt-auth.guard';

@Controller('account')
export class AccountController {

    constructor(private readonly accountService: AccountService) {
    }

    @Post('send-sign-in-otp')
    async sendOtp(@Req() req) {
        const cIp = req.connection.remoteAddress;
        return await this.accountService.sendSignInOtp(req.body, cIp);
    }

    @Post('sign-in')
    async signIn(@Body() user: AuthAppUserDTO) {
        return await this.accountService.login(user);
    }

    @Post('sign-up')
    async signUp(@Req() req) {
        let tempUser: AppUserDTO = req.body;
        tempUser.createdIp = req.connection.remoteAddress;
        tempUser.modifiedIp = req.connection.remoteAddress;
        return await this.accountService.signUp(tempUser);
    }

    @Post('resend-verification-code')
    async resendVerificationCode(@Req() req) {
        const cIp = req.connection.remoteAddress;
        return await this.accountService.resendVerificationOtp(req.body, cIp);
    }

    @Post('verify-account')
    async verifyAccount(@Req() req) {
        const cIp = req.connection.remoteAddress;
        return await this.accountService.verifyAccount(req.body, cIp);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async test() {
        return 'Success!';
    }
}
