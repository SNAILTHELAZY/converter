import { NgModule } from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import { NumberingSystemConverterComponent } from './numbering-system-converter/numbering-system-converter.component';

const routes:Routes=[
  {path:'',redirectTo:'numbering-system-converter',pathMatch:'full'},
  {path:'numbering-system-converter',component:NumberingSystemConverterComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
