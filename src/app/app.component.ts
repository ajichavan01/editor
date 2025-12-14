import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskbarModule } from './taskbar/taskbar.module';
import { LeftSidebarModule } from './left-sidebar/left-sidebar.module';
import { RightSidebarModule } from './right-sidebar/right-sidebar.module';
import { EditorModule } from './editor/editor.module';
import { TerminalModule } from './terminal/terminal.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskbarModule, LeftSidebarModule, RightSidebarModule, EditorModule, TerminalModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'editor';
}
