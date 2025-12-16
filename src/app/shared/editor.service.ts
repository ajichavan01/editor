import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  _isTerminalVisible: WritableSignal<boolean> = signal(true);
  readonly isTerminalVisible: Signal<boolean>  = this._isTerminalVisible;

  _isLeftSidebarVisible: WritableSignal<boolean> = signal(true);
  readonly isLeftSidebarVisible: Signal<boolean>  = this._isLeftSidebarVisible;
  
  _isRightSidebarVisible: WritableSignal<boolean> = signal(true)
  readonly isRightSidebarVisible: Signal<boolean>  = this._isRightSidebarVisible;
   
  constructor() { }

  toggleTerminal(): void {
    this._isTerminalVisible.set(!this._isTerminalVisible());
  }

  toggleLeftSidebar(): void {
    this._isLeftSidebarVisible.set(!this._isLeftSidebarVisible());
  }

  toggleRightSidebar(): void {
    this._isRightSidebarVisible.set(!this._isRightSidebarVisible());
  }
}
