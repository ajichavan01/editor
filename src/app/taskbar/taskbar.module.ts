import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskbarComponent } from './taskbar/taskbar.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TaskbarComponent
  ],
  exports: [
    TaskbarComponent
  ]
})
export class TaskbarModule { }
