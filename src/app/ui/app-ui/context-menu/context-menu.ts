import { Component } from '@angular/core';
import { EditorStateService } from '../../../services/editor-state-service';
import { EditorControllerService } from '../../../services/editor-controller-service';

@Component({
  selector: 'app-context-menu',
  imports: [],
  templateUrl: './context-menu.html',
  styleUrl: './context-menu.scss',
})
export class ContextMenu {
    constructor(public editorState: EditorStateService, public editorController: EditorControllerService){}

    get contextMenu(){
        return this.editorState.contextMenu
    }

    onRunPressed(event: PointerEvent){
        if(event.button != 0){
            event.stopPropagation()
            return;
        }

        const instanceId = this.contextMenu.instanceId

        if(!instanceId){
            return;
        }

        this.editorController.runInstance(instanceId)
    }

    onDeletePressed(event: PointerEvent){
        if(event.button != 0){
            event.stopPropagation()
            return;
        }

        const instanceId = this.contextMenu.instanceId

        if(!instanceId){
            return;
        }

        this.editorController.deleteInstance(instanceId)
    }
}
