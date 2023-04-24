import {Module} from '@nestjs/common';
import {MatrimonialController} from "./controller/matrimonial.controller";
import {MatrimonialService} from "./matrimonial.service";
import {matrimonialProvider} from "./matrimonial.providers";

@Module({
  controllers: [MatrimonialController],
  providers: [
    MatrimonialService,
    ...matrimonialProvider
  ]
})
export class MatrimonialModule {
}
