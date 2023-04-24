import {
  Body,
  Controller, Delete,
  Get, Param, Patch,
  Post,
  Put, Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  GetDetailDto,
  UpdateActiveDto,
} from '../../../common-dto/basic-input.dto';
import { JwtAuthGuard } from '../../account/jwt-auth.guard';
import {CreateFamilyDto, FamilyContactNumberDto, FamilySearchDto} from '../dto/family.dto';
import { FamilyService } from '../family.service';

@Controller('family')
export class FamilyController {
  constructor(private readonly service: FamilyService) {}

  // region : Family
  @UseGuards(JwtAuthGuard)
  @Get('list')
  async list(@Body() body: FamilySearchDto) {
    return await this.service.findAll(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('master-data')
  async getFamilyMasterData() {
    return await this.service.getFamilyMasterData();
  }

  @UseGuards(JwtAuthGuard)
  @Get('manage')
  async get(@Query() body: GetDetailDto) {
    return await this.service.fetchDetailById(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('manage')
  async create(@Body() body: CreateFamilyDto, @Req() req) {
    return await this.service.create(body, req.ip, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('manage/:id')
  async update(@Param('id') id: number, @Body() body: CreateFamilyDto, @Req() req) {
    return await this.service.update(id, body, req.ip, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/update-active-flag')
  async delete(@Body() body: UpdateActiveDto, @Req() req) {
    return await this.service.updateActiveFlag(body, req.ip, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('detail')
  async detail(@Query() body: GetDetailDto) {
    return await this.service.getDetail(body);
  }
  // endregion

  // region : Profile Info
  @UseGuards(JwtAuthGuard)
  @Get('profile-info/:id')
  async getProfileInfo(@Query() body: GetDetailDto) {
    return await this.service.fetchDetailById(body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile-info/:id')
  async updateProfileInfo(@Query() body: GetDetailDto) {
    return await this.service.fetchDetailById(body);
  }
  // endregion

  // region : Business
  @UseGuards(JwtAuthGuard)
  @Get('business-info/:id')
  async getFamilyBusiness(@Query() body: GetDetailDto) {
    return await this.service.fetchDetailById(body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('business-info/:id')
  async updateFamilyBusiness(@Query() body: GetDetailDto) {
    return await this.service.fetchDetailById(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-business-info-status-flag')
  async deleteFamilyBusiness(@Query() body: GetDetailDto) {
    return await this.service.fetchDetailById(body);
  }
  // endregion

  // region : Service
  @UseGuards(JwtAuthGuard)
  @Get('service-info/:id')
  async getFamilyService(@Query() body: GetDetailDto) {
    return await this.service.fetchDetailById(body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('service-info/:id')
  async updateFamilyServices(@Query() body: GetDetailDto) {
    return await this.service.fetchDetailById(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-service-info-status-flag')
  async deleteFamilyServices(@Query() body: GetDetailDto) {
    return await this.service.fetchDetailById(body);
  }
  // endregion

  // region : Contact Number
  @UseGuards(JwtAuthGuard)
  @Get('contact-info')
  async getFamilyContactNumber(@Query() body: GetDetailDto) {
    return await this.service.getFamilyContactNumbers(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('contact-info')
  async addFamilyContactNumber(@Body() body: FamilyContactNumberDto, @Req() req) {
    return await this.service.createContactNumber(body, req.ip, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('contact-info/:id')
  async updateFamilyContactNumber(@Param('id') id: number, @Body() body: FamilyContactNumberDto, @Req() req) {
    return await this.service.updateContactNumber(id, body, req.ip, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('contact-info/:id')
  async deleteFamilyContactNumber(@Param('id') id: number, @Req() req) {
    return await this.service.deleteContactNumber(id, req.ip, req.user.userId);
  }
  // endregion

  // region : Address
  @UseGuards(JwtAuthGuard)
  @Get('address-info/:id')
  async getFamilyAddress(@Query() body: GetDetailDto) {
    return await this.service.fetchDetailById(body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('address-info/:id')
  async updateFamilyAddress(@Query() body: GetDetailDto) {
    return await this.service.fetchDetailById(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-address-info-status-flag')
  async deleteFamilyAddress(@Query() body: GetDetailDto) {
    return await this.service.fetchDetailById(body);
  }
  // endregion
}
