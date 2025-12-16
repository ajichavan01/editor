import { Component, OnInit, Signal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskbarModule } from './taskbar/taskbar.module';
import { LeftSidebarModule } from './left-sidebar/left-sidebar.module';
import { RightSidebarModule } from './right-sidebar/right-sidebar.module';
import { EditorModule } from './editor/editor.module';
import { TerminalModule } from './terminal/terminal.module';
import { EditorService } from './shared/editor.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskbarModule, LeftSidebarModule, RightSidebarModule, EditorModule, TerminalModule],
  providers: [EditorService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'editor';

  constructor(public editorService: EditorService) {}

  ngOnInit(): void {
  }

}
