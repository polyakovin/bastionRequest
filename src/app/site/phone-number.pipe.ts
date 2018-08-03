import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {
  // 9101234567 -> +7 (910) 123-45-67
  transform(num: string): any {
    return num.replace(/^(\d{3})(\d{3})(\d{2})(\d{2})$/ig, '+7 ($1) $2–$3–$4');
  }
}
