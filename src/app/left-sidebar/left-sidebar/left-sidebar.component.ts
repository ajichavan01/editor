import { Component } from '@angular/core';

@Component({
  selector: 'app-left-sidebar',
  imports: [],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.scss'
})
export class LeftSidebarComponent {
 items = Array.from({ length: 20 }, (_, i) => { return {name: `Item ${i + 1}` }; });
}
