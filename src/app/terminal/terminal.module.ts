import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalComponent } from './terminal/terminal.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TerminalComponent
  ],
  exports: [TerminalComponent]
})
export class TerminalModule { }
