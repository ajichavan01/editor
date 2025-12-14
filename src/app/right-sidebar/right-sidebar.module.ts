import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RightSidebarComponent
  ],
  exports: [RightSidebarComponent]
})
export class RightSidebarModule { }
