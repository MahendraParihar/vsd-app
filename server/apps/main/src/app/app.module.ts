import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule, Env, LabelModule } from '@server/common';
import { AccountController } from './login/account.controller';
import { LabelController } from './label/label.controller';
import { AddressController } from './address/address.controller';
import { MediaController } from './media/media.controller';
import { PagesController } from './misc/pages.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { InquiryController } from './misc/Inquiry.controller';
import { InquiryService } from './misc/Inquiry.service';
import { InquiryModel } from './misc/models/inquiry.model';

@Module({
  imports: [
    CommonModule.forRoot([InquiryModel], []),
    LabelModule.asyncRegister(['admin']),
    ServeStaticModule.forRoot({
      rootPath: Env.persistentStorageAssetPath,
    }),
  ],
  controllers: [
    AppController, AccountController, LabelController, AddressController,
    MediaController,
    PagesController,
    InquiryController,
  ],
  providers: [AppService, InquiryService],
})
export class AppModule {}
