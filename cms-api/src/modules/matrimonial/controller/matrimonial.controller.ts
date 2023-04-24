import {Controller} from '@nestjs/common';
import {MatrimonialService} from "../matrimonial.service";

@Controller('matrimonial')
export class MatrimonialController {

  constructor(private service: MatrimonialService) {
  }

  /*@UseGuards(JwtAuthGuard)
  @Get('list')
  async list(@Query() req) {
    return await this.service.findAllMatrimonial(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('manage')
  async get(@Query() req: GetDetailDto) {
    return await this.service.fetchMatrimonialDetailById(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('manage')
  async create(@Body() req: CreateMatrimonialDto) {
    return await this.service.createMatrimonial(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('manage')
  async update(@Body() req: CreateMatrimonialDto) {
    return await this.service.updateMatrimonial(req);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-status')
  async delete(@Body() req: UpdateActiveDto) {
    return await this.service.updateMatrimonialStatus(req);
  }*/
}
