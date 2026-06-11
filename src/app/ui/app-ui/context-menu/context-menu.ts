import { Component } from '@angular/core';
import { EditorStateService } from '../../../services/editor-state-service';

@Component({
  selector: 'app-context-menu',
  imports: [],
  templateUrl: './context-menu.html',
  styleUrl: './context-menu.scss',
})
export class ContextMenu {
    constructor(public editorState: EditorStateService){}
}
