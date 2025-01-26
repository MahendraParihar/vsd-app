import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncateText', standalone: false })
export class TruncateTextPipe implements PipeTransform {
  transform(value: string, ...args: any[]): any {
    if (!value || value.length === 0) {
      return '';
    }
    const maxLength = args[0];
    const maxLengthNotProvided = !maxLength;
    const isShorterThanMaximumLength = value.length < maxLength;
    if (maxLengthNotProvided || isShorterThanMaximumLength) {
      return value;
    }
    const shortenedString = value.substr(0, maxLength - 3);
    return `${shortenedString}...`;
  }
}
