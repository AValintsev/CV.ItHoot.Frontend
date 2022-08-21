import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dateUtcPipe'
})
export class DateUtcPipe implements PipeTransform {
  transform(date: Date): any {
    const dateUTC = new Date(`${date}`)

    return dateUTC.toLocaleDateString().replace(/.\d+Z$/g, "Z");
  }
}

@Pipe({
  name: 'dateUtcPipeWithTime'
})
export class DateUtcPipeWithTime implements PipeTransform {
  transform(date: Date): any {
    const dateUTC = new Date(`${date}`)

    return dateUTC.toLocaleString();
  }
}
