import { Controller, Get, Param } from '@nestjs/common';
import { LabelDataService, Public } from '@server/common';

@Controller('label')
export class LabelController {
  constructor(private labelService: LabelDataService) {
  }

  @Public()
  @Get('/:app')
  async getLabels(@Param('app') app: string): Promise<{ [p: string]: string }> {
    try {
      return await this.labelService.load(app);
    } catch (e) {
      throw new Error(e);
    }
  }
}
