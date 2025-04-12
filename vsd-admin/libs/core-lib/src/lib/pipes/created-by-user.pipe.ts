import { Pipe, PipeTransform } from '@angular/core';
import { IBaseAdminUser } from '@vsd-common/lib';

@Pipe({
  name: 'appCreatedByUser',
  standalone: false
})
export class CreatedByUserPipe implements PipeTransform {
  transform(value: IBaseAdminUser): string {
    if (value) {
      return (`${value.firstName ? value.firstName : ''} ${value.lastName ? value.lastName : ''}`).trim();
    }
    return '';
  }
}
