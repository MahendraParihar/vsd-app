  import {IsNotEmpty} from 'class-validator';
import {BasicSearchDto} from '../../../common-dto/basic-input.dto';

export class LovSearchDtp extends BasicSearchDto {
  name?: string;
}

export class LovBasicDto {
  @IsNotEmpty()
  id: number;
}

export class LovUpdateStatusDto extends LovBasicDto {
  @IsNotEmpty()
  active: boolean;
}
