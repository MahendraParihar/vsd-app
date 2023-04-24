import {Module} from '@nestjs/common';
import {AccountService} from './account.service';
import {AccountController} from './account.controller';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {accountProvider} from './account.providers';
import {JwtStrategy} from './jwt.strategy';

@Module({
    controllers: [AccountController],
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWTKEY,
            signOptions: {
                expiresIn: process.env.TOKEN_EXPIRATION,
            },
        }),
    ],
    exports: [],
    providers: [
        AccountService,
        JwtStrategy,
        ...accountProvider
    ]
})
export class AccountModule {
}
