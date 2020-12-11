import { stringify } from '@angular/compiler/src/util';
import { Component,OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'numbering-system-converter';
  numberingSystem=['Decimal','Binary','Roman','Hexadecimal','Octal'];

  fg:FormGroup;

  selectedNumberingSystem:string='Decimal';

  binary='';
  decimal='';
  octal='';
  hexadecimal='';
  roman='';

  constructor(fb:FormBuilder){
    this.fg=fb.group({
      input:[''],
      numberingSystem:['']
    });
  }

  onInputChange(value:string){
    var input=value;
    if(input!=stringify(0) || input!=null){
      switch(this.selectedNumberingSystem){
        case 'Binary':
          this.binary=input;
          this.octal=parseInt(input,2).toString(8);
          this.decimal=parseInt(input,2).toString(10);
          this.hexadecimal=parseInt(input,2).toString(16);
          this.convertToRoman();
          break;
        case 'Octal':
          this.binary=parseInt(input,8).toString(2);
          this.octal=input;
          this.decimal=parseInt(input,8).toString(10);
          this.hexadecimal=parseInt(input,8).toString(16);
          this.convertToRoman();
          break;
        case 'Decimal':
          this.binary=parseInt(input).toString(2);
          this.octal=parseInt(input).toString(8);
          this.decimal=input;
          this.hexadecimal=parseInt(input).toString(16);
          this.convertToRoman();
          break;
        case 'Hexadecimal':
          this.binary=parseInt(input,16).toString(2);
          this.octal=parseInt(input,16).toString(8);
          this.decimal=parseInt(input,16).toString(10);
          this.hexadecimal=input;
          this.convertToRoman();
          break;
        case 'Roman':
          this.roman=input;
          this.decimal=this.romanToArabic(input);
          this.binary=parseInt(this.decimal,10).toString(2);
          this.octal=parseInt(this.decimal,10).toString(8);
          this.hexadecimal=parseInt(this.decimal,10).toString(16);
          break;
      }
    }else{
      this.binary='0'
      this.octal='0';
      this.decimal='0';
      this.hexadecimal='0';
      this.roman='0';
    }
  }

  onInputSystemChange(value){
    console.log(value);
    this.selectedNumberingSystem=value;
  }

  convertToRoman(){
    /*
    1=I
    5=V
    10=X
    50=L
    100=C
    500=D
    1000=M
    */
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

    var num=parseInt(this.decimal,10);
    
    for(var i of Object.keys(roman)){
      var q=Math.floor(num/roman[i]);
      num-=q*roman[i];
      str+=i.repeat(q);
    }

    this.roman=str;
  }

  romanToArabic(input:string){
    if(input==null){
      return '';
    }
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

  charToInt(char:string){
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
