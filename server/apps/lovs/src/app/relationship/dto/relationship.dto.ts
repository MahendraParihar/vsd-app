import { IManageRelationship } from '@vsd-common/lib';
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class RelationshipDto implements IManageRelationship {
  @IsOptional()
  @IsNumber()
  relationshipId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  relationship: string;

  @IsOptional()
  @IsObject()
  imagePath: object;

}
