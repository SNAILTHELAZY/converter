import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { stringify } from '@angular/compiler/src/util';
import {NumberingSystem} from '../interfaces/numbering-system';
import {NumberingSystemConverterService} from '../services/numbering-system-converter.service';
import {Error} from '../interfaces/error';

@Component({
  selector: 'app-numbering-system-converter',
  templateUrl: './numbering-system-converter.component.html',
  styleUrls: ['./numbering-system-converter.component.css']
})
export class NumberingSystemConverterComponent implements OnInit {
  numberingSystem=['Decimal','Binary','Roman','Hexadecimal','Octal'];

  fg:FormGroup;

  selectedNumberingSystem:string='Decimal';

  numberSystemInterface:NumberingSystem={
    binary:'0',
    octal:'0',
    decimal:'0',
    hexadecimal:'0',
    roman:'0'
  };

  myError:Error={reason:''};

  constructor(fb:FormBuilder,public numberConverter:NumberingSystemConverterService) {
    this.fg=fb.group({
      input:[''],
      numberingSystem:['']
    });
   }

  ngOnInit(): void {
  }


  onInputChange(value:string){
    var input=value;
    if(input!=stringify(0) || input!=null){
      var from='';
      //console.log(value.match('/^[01]+$/')===null);
      
      switch(this.selectedNumberingSystem){
        case 'Binary':
          if(value.match(/^[01]+$/)===null){
            this.myError.reason='the input value should only include 1 or 0!';
          }else{
            this.myError.reason='';
            from='b';
          }
          break;
        case 'Octal':
          if(value.match(/^[1-7][0-7]*$/)===null){
            this.myError.reason='only 0 - 7 is allowed for this numbering system!'
          }else{
            this.myError.reason='';
            from='o';
          }
          
          break;
        case 'Decimal':
          if(value.match(/\d/)===null){
            this.myError.reason='only 0-9 is allowed'
          }else{
            this.myError.reason='';
            from='d';
          }
          break;
        case 'Hexadecimal':
          if(value.match(/^[\da-f]+$/)===null){
            this.myError.reason='this is not allowed'
          }else{
            this.myError.reason='';
            from='h';
          }
          break;
        case 'Roman':
          if(value.match(/^M(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/)===null){
            this.myError.reason='no numbers are allowed'
          }else{
            this.myError.reason='';
            from='r';
          }
          break;
      }
      
      if(this.myError.reason=='' && from!=''){
        this.numberSystemInterface=this.numberConverter.convert(value,from);
      }
    }else{
      this.numberSystemInterface={
        binary:'0',
        octal:'0',
        decimal:'0',
        hexadecimal:'0',
        roman:'0'
      }
    }
  }

  onInputSystemChange(value){
    this.selectedNumberingSystem=value;
  }
  
}
