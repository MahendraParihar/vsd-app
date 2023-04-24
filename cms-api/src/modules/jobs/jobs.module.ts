import {Module} from '@nestjs/common';
import {JobController} from './controller/job.controller';
import {JobService} from './job.service';
import {jobProvider} from './job.providers';
import {CommonModule} from '../common/common.module';

@Module({
  controllers: [JobController],
  providers: [JobService,
    ...jobProvider,
    CommonModule]
})
export class JobsModule {
}
