import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { RelationshipService, TableListDto, StatusChangeDto } from '@server/common';
import { IRelationshipList, ITableList } from '@vsd-common/lib';
import { RelationshipDto } from './dto/relationship.dto';

@Controller('relationship')
export class RelationshipController {
  constructor(private relationshipService: RelationshipService) {
  }

  @Post()
  async loadRelationships(@Body() payload: TableListDto): Promise<ITableList<IRelationshipList>> {
    try {
      return await this.relationshipService.load(payload);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get(':id')
  loadRelationship(@Param('id') id: number) {
    try {
      return this.relationshipService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('details/:id')
  loadRelationshipDetail(@Param('id') id: number) {
    try {
      return this.relationshipService.loadDetailById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('manage')
  manageRelationship(@Body() body: RelationshipDto, userId: number) {
    try {
      return this.relationshipService.manage(body, userId);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('status/:id')
  updateRelationshipStatus(@Param('id') id: number, @Body() statusChange: StatusChangeDto) {
    try {
      return this.relationshipService.updateStatus(id, statusChange, 1);
    } catch (e) {
      throw new Error(e);
    }
  }
}
