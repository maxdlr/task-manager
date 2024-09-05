import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toUpperCase',
  standalone: true,
})
export class ToUpperCasePipe implements PipeTransform {
  transform(value: string, title: boolean = false): string {
    let newValue = value.toUpperCase();

    if (title) newValue = value.charAt(0).toUpperCase() + value.substring(1);

    return newValue;
  }
}
