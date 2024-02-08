import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "customCurrency",
})
export class CustomCurrencyPipe implements PipeTransform {
  transform(value: number, currencyCode?: string): string {
    if (typeof value === 'number') {
      if (currencyCode) {
        return `${currencyCode} ${value.toFixed(2)}`;
      } else {
        return `${value.toFixed(2)}`;
      }
    }
    return value;
  }
}
