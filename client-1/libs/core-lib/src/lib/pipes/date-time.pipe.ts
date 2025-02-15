import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment/moment';
import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_TIME_FORMAT,
  DEFAULT_DATE_TIME_FORMAT,
  DISPLAY_TIME_FORMAT,
} from '../constants/constants';

@Pipe({
  name: 'appDateTime',
  standalone: false
})
export class DateTimePipe implements PipeTransform {
  transform(value: Date, type = 'dateTime'): string {
    if (value) {
      switch (type) {
        case 'onlyDate':
          return moment(value).format(DEFAULT_DATE_FORMAT);
        case 'onlyTime':
          return moment(value, DEFAULT_TIME_FORMAT).format(DISPLAY_TIME_FORMAT);
        case 'dateTime':
        default:
          return moment(value).format(DEFAULT_DATE_TIME_FORMAT);
      }
    }
    return '';
  }
}
