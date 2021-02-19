import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'personName'
})
export class PersonNamePipe implements PipeTransform {

  transform(value: any, displayPrefix: boolean = false): unknown {
    let prefix = '';
    if (displayPrefix)
      prefix = (value.gender && value.gender === 'Male') ? 'Mr.' : 'Mrs.';
    return `${prefix}${value.firstName} ${value.lastName}`;
  }

}
