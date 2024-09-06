import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
  // standalone: true,
})
export class FormatDatePipe implements PipeTransform {
  private toTwoDigits = (number: number): string | number =>
    number.toString().length < 2 ? '0' + number : number;

  transform(value: Date): string {
    const day = this.toTwoDigits(value.getDate());
    const month = this.toTwoDigits(value.getMonth());
    const year = this.toTwoDigits(value.getFullYear());

    return `${day}/${month}/${year}`;
  }
}
