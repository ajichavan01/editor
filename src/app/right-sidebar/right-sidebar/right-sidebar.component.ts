import { Component } from '@angular/core';

@Component({
  selector: 'app-right-sidebar',
  imports: [],
  templateUrl: './right-sidebar.component.html',
  styleUrl: './right-sidebar.component.scss'
})
export class RightSidebarComponent {
 items = Array.from({ length: 20 }, (_, i) => { return {name: `Item ${i + 1}` }; });

}
