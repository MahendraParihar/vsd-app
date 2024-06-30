import { IsBoolean, IsNotEmpty } from 'class-validator';
import { IStatusChange } from '@vsd-common/lib';

export class StatusChangeDto implements IStatusChange {
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
