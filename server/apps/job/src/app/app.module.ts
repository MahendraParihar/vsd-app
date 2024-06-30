import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule, LabelModule } from '@server/common';
import { JobModel } from './models/job.model';
import { JobController } from './controllers/job.controller';
import {JobService} from "./controllers/job.service";

@Module({
  imports: [CommonModule.forRoot([JobModel], []),
    LabelModule.asyncRegister(['admin']),
  ],
  controllers: [AppController, JobController],
  providers: [AppService, JobService],
})
export class AppModule {}
