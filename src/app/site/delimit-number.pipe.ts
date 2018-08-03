import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'delimitNumber'
})
export class DelimitNumberPipe implements PipeTransform {
  // 1234567 -> 1 234 567
  transform(num: number | string): any {
    var numFormated, i, j, len, n;
    numFormated = "";
    num = num + "";
    for (i = j = 0, len = num.length; j < len; i = ++j) {
      n = num[i];
      if ((i + 1) % 3 === 0 && i !== (num.length - 1)) {
        numFormated = num[num.length - 1 - i] + numFormated;
        numFormated = " " + numFormated;
      } else {
        numFormated = num[num.length - 1 - i] + numFormated;
      }
    }
    return numFormated;
  }
}
