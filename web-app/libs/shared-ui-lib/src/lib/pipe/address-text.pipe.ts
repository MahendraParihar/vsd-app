import { Pipe, PipeTransform } from '@angular/core';
import { IAddressDetail } from '@vsd-common/lib';

@Pipe({ name: 'addressText', standalone: false })
export class AddressTextPipe implements PipeTransform {
  transform(obj: IAddressDetail): any {
    if (!obj) {
      return '';
    }
    let str = '';
    if (obj.address) {
      str = str.length > 0 ? `${str} ${obj.address}, ` : `${obj.address}, `;
    }
    if (obj.cityVillage) {
      str = str.length > 0 ? `${str} ${obj.cityVillage}, ` : `${obj.cityVillage}, `;
    }
    if (obj.district) {
      str = str.length > 0 ? `${str} ${obj.district}, ` : `${obj.district}, `;
    }
    if (obj.state) {
      str = str.length > 0 ? `${str} ${obj.state}, ` : `${obj.state}, `;
    }
    if (obj.country) {
      str = str.length > 0 ? `${str} ${obj.country}, ` : `${obj.country}, `;
    }
    return str;
  }
}
