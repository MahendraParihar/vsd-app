import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule, LabelModule } from '@server/common';
import { TempleModel } from './models/temple.model';
import { TempleController } from './temple/temple.controller';
import { TempleService } from './temple/temple.service';

@Module({
  imports: [CommonModule.forRoot([TempleModel], []),
    LabelModule.asyncRegister(['admin'])],
  controllers: [AppController, TempleController],
  providers: [AppService, TempleService],
})
export class AppModule {}
