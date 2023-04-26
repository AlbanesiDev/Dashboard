import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullnamePipe } from './full-name.pipe';
import { ControlErrorsPipe } from './control-error-messages.pipe';

@NgModule({
  declarations: [
    FullnamePipe,
    ControlErrorsPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FullnamePipe,
    ControlErrorsPipe
  ]

})
export class PipesModule { }