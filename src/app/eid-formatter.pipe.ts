import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eidFormatter'
})
export class EidFormatterPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }
  transform(value: string): string {
    if (value && value.length === 15) {
      return `${value.substring(0, 3)}-${value.substring(3, 7)}-${value.substring(7, 14)}-${value.substring(14)}`;
    }
    return value; // Return the value as is if it doesn't match the expected length
  }

}
