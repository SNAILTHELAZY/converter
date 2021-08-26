import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import {NumberingSystem} from '../interfaces/numbering-system';

@Injectable({
  providedIn: 'root'
})
export class NumberingSystemConverterService {

  constructor() { }

  //this function receive numbers and the selected numbering system to convert
  public convert(value:string,from:string):NumberingSystem{
    switch(from){
      case 'b':
        return {
          binary:parseInt(value,2).toString(2),
          octal:parseInt(value,2).toString(8),
          decimal:parseInt(value,2).toString(10),
          hexadecimal:parseInt(value,2).toString(16),
          roman:this.convertToRoman(parseInt(value,2).toString(10))
        }
      case 'd':
        return {
          binary:parseInt(value,10).toString(2),
          octal:parseInt(value,10).toString(8),
          decimal:parseInt(value,10).toString(10),
          hexadecimal:parseInt(value,10).toString(16),
          roman:this.convertToRoman(parseInt(value,10).toString(10))
        }
      case 'o':
        return {
          binary:parseInt(value,8).toString(2),
          octal:parseInt(value,8).toString(8),
          decimal:parseInt(value,8).toString(10),
          hexadecimal:parseInt(value,8).toString(16),
          roman:this.convertToRoman(parseInt(value,8).toString(10))
        }
      case 'h':
        return {
          binary:parseInt(value,16).toString(2),
          octal:parseInt(value,16).toString(8),
          decimal:parseInt(value,16).toString(10),
          hexadecimal:parseInt(value,16).toString(16),
          roman:this.convertToRoman(parseInt(value,16).toString(10))
        }
      case 'r':
        return{
          decimal:this.romanToArabic(value).toString(),
          binary:parseInt(this.romanToArabic(value),10).toString(2),
          octal:parseInt(this.romanToArabic(value),10).toString(8),
          hexadecimal:parseInt(this.romanToArabic(value),10).toString(16),
          roman:value
        };
      default:
        break;
    }
  }

  private convertToRoman(decimal:string):string{
    
    var str='';

    var roman={
      M:1000,
      CM:900,
      D:500,
      CD:400,
      C:100,
      XC:90,
      L:50,
      XL:40,
      X:10,
      IX:9,
      V:5,
      IV:4,
      I:1
    };

    var num=parseInt(decimal,10);
    
    for(var i of Object.keys(roman)){
      var q=Math.floor(num/roman[i]);
      num-=q*roman[i];
      str+=i.repeat(q);
    }

    return str;
  }

  private romanToArabic(input:string):string{
    var total=0,value=0,prev=0;

    for(var i=0;i<input.length;i++){
      var cur=this.charToInt(input.charAt(i));
      if(cur>prev){
        total-=2*value;
      }
      if(cur!==prev){
        value=0;
      }
      value+=cur;
      total+=cur;
      prev=cur;
    }
    return total.toString(10);
  }

  private charToInt(char:string):number{
    switch(char){
      case 'I':
        return 1;
      case 'V':
        return 5;
      case 'X':
        return 10;
      case 'L':
        return 50;
      case 'C':
        return 100;
      case 'D':
        return 500;
      case 'M':
        return 1000;
      default:
        return -1;
    }
  }
}
