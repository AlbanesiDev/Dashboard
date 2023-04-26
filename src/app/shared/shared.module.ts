import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angularMaterial/AngularMaterial.module';
import { DialogModule } from '@angular/cdk/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DirectivesModule } from './directives/directives.module';
import { PipesModule } from './pipes/pipes.module';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    PipesModule,
    DirectivesModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    DialogModule
  ],
  exports: [
    PipesModule
  ]
})
export class SharedModule { }
