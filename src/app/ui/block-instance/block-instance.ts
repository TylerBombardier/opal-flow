import { Component, Input } from '@angular/core';
import { GraphService } from '../../services/graph-service';
import { Instance } from '../../graph/types';
import { EditorStateService } from '../../services/editor-state-service';
import { EditorControllerService } from '../../services/editor-controller-service';
import { ParamRenderer } from '../param-renderer/param-renderer';

@Component({
  selector: 'app-block-instance',
  imports: [ParamRenderer],
  templateUrl: './block-instance.html',
  styleUrl: './block-instance.scss',
})
export class BlockInstance {
    constructor(public graphService: GraphService, public editorState: EditorStateService, public editorController: EditorControllerService){}

    @Input()
    instance!: Instance

    get block(){
        return this.graphService.getGraph().registry.get(this.instance.blockId)
    }

    onHandleGrab(event: PointerEvent){
        event.stopPropagation()
        this.editorController.onHandleGrab(this.instance, event)
    }

    onFocus(event: PointerEvent){
        this.editorController.bringInstanceToFront(this.instance.id)
    }
}
