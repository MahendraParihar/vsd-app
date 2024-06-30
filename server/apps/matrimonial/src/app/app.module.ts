import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule, LabelModule } from '@server/common';

@Module({
  imports: [CommonModule.forRoot([], []),
    LabelModule.asyncRegister(['admin'])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
