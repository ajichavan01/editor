import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LeftSidebarComponent
  ],
  exports: [LeftSidebarComponent]
})
export class LeftSidebarModule { }
