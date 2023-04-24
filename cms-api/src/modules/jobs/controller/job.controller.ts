import {Body, Controller, Get, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import {JobService} from "../job.service";
import {JwtAuthGuard} from "../../account/jwt-auth.guard";
import {GetDetailDto, UpdateActiveDto} from "../../../common-dto/basic-input.dto";
import {CreateJobDto} from "../dto/job.dto";

@Controller('job')
export class JobController {
  constructor(private service: JobService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async list(@Query() req) {
    return await this.service.findAllJob(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('manage')
  async get(@Query() req: GetDetailDto) {
    return await this.service.fetchJobDetailById(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('manage')
  async create(@Body() req: CreateJobDto) {
    return await this.service.createJob(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('manage')
  async update(@Body() req: CreateJobDto) {
    return await this.service.updateJob(req);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-status')
  async delete(@Body() body: UpdateActiveDto, @Req() req) {
    return await this.service.updateJobStatus(body, req.ip, req.user.userId);
  }
}
