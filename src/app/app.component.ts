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
          break;
        case 'Octal':
          this.binary=parseInt(input,8).toString(2);
          this.octal=input;
          this.decimal=parseInt(input,8).toString(10);
          this.hexadecimal=parseInt(input,8).toString(16);
          break;
        case 'Decimal':
          this.binary=parseInt(input).toString(2);
          this.octal=parseInt(input).toString(8);
          this.decimal=input;
          this.hexadecimal=parseInt(input).toString(16);
          break;
        case 'Hexadecimal':
          this.binary=parseInt(input,16).toString(2);
          this.octal=parseInt(input,16).toString(8);
          this.decimal=parseInt(input,16).toString(10);
          this.hexadecimal=input
          break;
        case 'Roman':
          break;
      }
    }
  }

  onInputSystemChange(value){
    console.log(value);
    this.selectedNumberingSystem=value;
  }
}
