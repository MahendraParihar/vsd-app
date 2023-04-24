import {IsNotEmpty} from 'class-validator';
import {DEFAULT_PAGE_SIZE} from '../constants/config-constants';

export class PagingDto {
  @IsNotEmpty()
  pageNumber: number = 0;

  @IsNotEmpty()
  pageSize: number = DEFAULT_PAGE_SIZE;
}

export class BasicSearchDto extends PagingDto {
  createdFrom?: Date;
  createdTo?: Date;
  active?: boolean
}

export class UpdateActiveDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  active: boolean;
}

export class GetDetailDto {
  @IsNotEmpty()
  id: number;
}
