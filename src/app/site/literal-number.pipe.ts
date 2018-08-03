import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'literalNumber'
})
export class LiteralNumberPipe implements PipeTransform {
  // 123 — сто двадцать три рубля 00 копеек
  transform(number: any): any {
    if(number === 0) {
      return "нуль рублей 00 копеек";
    }
    var arr_numbers, count, decimals_parser, num_digit, num_parser, number_arr, number_decimals, number_length, number_parser, p, string;
    arr_numbers = new Array;
    number_parser = function(num, desc) {
      var first_num, last_2_nums, last_num, num_hundred, second_num, string;
      string = '';
      num_hundred = '';
      if (num.length === 3) {
        num_hundred = num.substr(0, 1);
        num = num.substr(1, 3);
        string = arr_numbers[3][num_hundred] + ' ';
      }
      if (num < 20) {
        string += arr_numbers[1][parseFloat(num)] + ' ';
      } else {
        first_num = num.substr(0, 1);
        second_num = num.substr(1, 2);
        string += arr_numbers[2][first_num] + ' ' + arr_numbers[1][second_num] + ' ';
      }
      switch (desc) {
        case 0:
          last_num = parseFloat(num.substr(-1));
          last_2_nums = parseFloat(num.substr(-2));
          if (last_2_nums > 10 && last_2_nums < 21) {
            string += 'рублей';
          } else if (last_num === 1) {
            string += 'рубль';
          } else if (last_num > 1 && last_num < 5) {
            string += 'рубля';
          } else {
            string += 'рублей';
          }
          break;
        case 1:
          last_num = parseFloat(num.substr(-1));
          last_2_nums = parseFloat(num.substr(-2));
          if (last_2_nums > 10 && last_2_nums < 21) {
            string += 'тысяч ';
          } else if (last_num === 1) {
            string += 'тысяча ';
          } else if (last_num > 1 && last_num < 5) {
            string += 'тысячи ';
          } else {
            string += 'тысяч ';
          }
          string = string.replace('один ', 'одна ');
          string = string.replace('два ', 'две ');
          break;
        case 2:
          last_num = parseFloat(num.substr(-1));
          last_2_nums = parseFloat(num.substr(-2));
          if (last_2_nums > 10 && last_2_nums < 21) {
            string += 'миллионов ';
          } else if (last_num === 1) {
            string += 'миллион ';
          } else if (last_num > 1 && last_num < 5) {
            string += 'миллиона ';
          } else {
            string += 'миллионов ';
          }
          break;
        case 3:
          last_num = parseFloat(num.substr(-1));
          last_2_nums = parseFloat(num.substr(-2));
          if (last_2_nums > 10 && last_2_nums < 21) {
            string += 'миллиардов ';
          } else if (last_num === 1) {
            string += 'миллиард ';
          } else if (last_num > 1 && last_num < 5) {
            string += 'миллиарда ';
          } else {
            string += 'миллиардов ';
          }
      }
      string = string.replace('  ', ' ');
      return string;
    };
    decimals_parser = function(num) {
      var first_num, second_num, string;
      first_num = num.substr(0, 1);
      second_num = parseFloat(num.substr(1, 2));
      string = ' ' + first_num + second_num;
      if (second_num === 1) {
        string += ' копейка';
      } else if (second_num > 1 && second_num < 5) {
        string += ' копейки';
      } else {
        string += ' копеек';
      }
      return string;
    };
    arr_numbers[1] = new Array('', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать');
    arr_numbers[2] = new Array('', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто');
    arr_numbers[3] = new Array('', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот');
    if (!number || number === 0) {
      return false;
    }
    if (typeof number !== 'number') {
      number = number.replace(',', '.');
      number = parseFloat(number);
      if (isNaN(number)) {
        return false;
      }
    }
    number = number.toFixed(2);
    if (number.indexOf('.') !== -1) {
      number_arr = number.split('.');
      number = number_arr[0];
      number_decimals = number_arr[1];
    }
    number_length = number.length;
    string = '';
    num_parser = '';
    count = 0;
    p = number_length - 1;
    while (p >= 0) {
      num_digit = number.substr(p, 1);
      num_parser = num_digit + num_parser;
      if ((num_parser.length === 3 || p === 0) && !isNaN(parseFloat(num_parser))) {
        string = number_parser(num_parser, count) + string;
        num_parser = '';
        count++;
      }
      p--;
    }
    if (number_decimals) {
      string += decimals_parser(number_decimals);
    }
    return string;
  }
}
