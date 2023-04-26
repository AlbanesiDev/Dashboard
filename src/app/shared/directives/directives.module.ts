import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontSizeDirective } from './font-size.directive';



@NgModule({
  declarations: [
    FontSizeDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FontSizeDirective
  ]
})
export class DirectivesModule { }
