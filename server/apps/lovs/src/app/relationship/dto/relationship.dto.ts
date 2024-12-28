import { IManageRelationship, IMediaUpload } from '@vsd-common/lib';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class RelationshipDto implements IManageRelationship {
  @IsOptional()
  @IsNumber()
  relationshipId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  relationship: string;

  @IsOptional()
  @IsArray()
  imagePath: IMediaUpload[];

}
