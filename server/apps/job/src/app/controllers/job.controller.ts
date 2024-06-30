import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { StatusChangeDto } from '@server/common';

@Controller('job')
export class JobController {
  @Get()
  loadJobs() {}

  @Get(':id')
  loadJob() {}

  @Get('details/:id')
  loadJobDetail() {}

  @Post('')
  manageJob() {}

  @Put('status/:id')
  updateJobStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto) {}
}
