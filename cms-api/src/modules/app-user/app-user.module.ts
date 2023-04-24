import {Module} from '@nestjs/common';
import {AppUserController} from "./controller/app-user.controller";
import {AppUserService} from "./app-user.service";
import {appUserProvider} from "./app-user.providers";

@Module({
  controllers: [AppUserController],
  providers: [
    AppUserService,
    ...appUserProvider
  ]
})
export class AppUserModule {
}
