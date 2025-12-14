import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor/editor.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EditorComponent
  ],
  exports: [EditorComponent]
})
export class EditorModule { }
