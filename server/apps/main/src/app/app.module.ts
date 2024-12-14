import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule, LabelModule } from '@server/common';
import { AccountController } from './login/account.controller';
import { LabelController } from './label/label.controller';
import { MiscController } from './misc/misc.controller';
import { AddressController } from './address/address.controller';
import { MediaController } from './media/media.controller';

@Module({
  imports: [CommonModule.forRoot([], []),
    LabelModule.asyncRegister(['admin'])],
  controllers: [
    AppController, AccountController, LabelController, MiscController, AddressController,
    MediaController,
  ],
  providers: [AppService],
})
export class AppModule {}
