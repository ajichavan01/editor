import { Component } from '@angular/core';
import { EditorService } from '../../shared/editor.service';

@Component({
  selector: 'app-taskbar',
  imports: [],
  templateUrl: './taskbar.component.html',
  styleUrl: './taskbar.component.scss'
})
export class TaskbarComponent {

  constructor(private readonly editorService: EditorService) { }

  toggleTerminal(): void {
    this.editorService.toggleTerminal();
  }

  toggleLeftSidebar(): void {
    this.editorService.toggleLeftSidebar();
  }

  toggleRightSidebar(): void {
    this.editorService.toggleRightSidebar();
  }

}
