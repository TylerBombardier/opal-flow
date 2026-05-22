import { Component, Input } from '@angular/core';
import { GraphService } from '../../services/graph-service';
import { Instance } from '../../graph/types';
import { EditorStateService } from '../../services/editor-state-service';

@Component({
  selector: 'app-block-instance',
  imports: [],
  templateUrl: './block-instance.html',
  styleUrl: './block-instance.scss',
})
export class BlockInstance {
    constructor(public graphService: GraphService, public editorState: EditorStateService){}

    @Input()
    instance!: Instance

    get block(){
        return this.graphService.getGraph().registry.get(this.instance.blockId)
    }

    onMouseDown(event: MouseEvent){
        event.preventDefault()
        event.stopPropagation()

        const mouse = this.editorState.screenToWorld(
            event.clientX,
            event.clientY
        )

        this.editorState.draggingInstanceId = this.instance.id

        this.editorState.dragOffset = {
            x: mouse.x - this.instance.position.x,
            y: mouse.y - this.instance.position.y
        }
    }
}
