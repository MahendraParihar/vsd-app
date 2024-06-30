import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule, LabelModule } from '@server/common';
import { JobModel } from './models/job.model';
import { JobController } from './controllers/job.controller';

@Module({
  imports: [CommonModule.forRoot([JobModel], []),
    LabelModule.asyncRegister(['admin']),
  ],
  controllers: [AppController, JobController],
  providers: [AppService],
})
export class AppModule {}
