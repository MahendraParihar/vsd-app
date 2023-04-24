import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
    name: 'dateFormat'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {

    public static DISPLAY_DATE_FORMAT = 'LL-MMM-YYYY h:mm:ss a';

    override transform(value: any, args?: any): any {
        return super.transform(value, DateFormatPipe.DISPLAY_DATE_FORMAT);
    }

}
