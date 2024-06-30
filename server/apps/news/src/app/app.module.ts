import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule, LabelModule } from '@server/common';
import { CurrentAffairModel } from './models/current-affair.model';
import { NewsController } from './controllers/news.controller';
import { NewsService } from './controllers/news.service';

@Module({
  imports: [CommonModule.forRoot([CurrentAffairModel], []),
    LabelModule.asyncRegister(['admin'])],
  controllers: [AppController, NewsController],
  providers: [AppService, NewsService],
})
export class AppModule {}
