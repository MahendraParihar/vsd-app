import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ITableListFilter } from '@vsd-common/lib';

export class TableListDto implements ITableListFilter {
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @IsNumber()
  @IsNotEmpty()
  limit: number;

  @IsOptional()
  @IsString()
  search?: string;
}
