import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dateUtcPipe'
})
export class DateUtcPipe implements PipeTransform {
  transform(date: Date): any {
    const dateUTC = new Date(`${date}`)
    return dateUTC.toLocaleString();
  }
}
