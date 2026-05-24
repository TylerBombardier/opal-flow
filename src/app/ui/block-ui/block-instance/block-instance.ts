import { Component, Input } from '@angular/core';
import { GraphService } from '../../../services/graph-service';
import { Instance } from '../../../graph/types';
import { EditorStateService } from '../../../services/editor-state-service';
import { EditorControllerService } from '../../../services/editor-controller-service';
import { SlotRow } from '../types/slot-row';

@Component({
  selector: 'app-block-instance',
  imports: [],
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

    get rows(){
        const rows: SlotRow[] = []

        for (const input of this.block.inputs) {
            rows.push({
                kind: "input",
                id: input.id,
                label: input.id,
                type: input.type
            });
        }

        for (const param of this.block.params ?? []) {
            rows.push({
                kind: "param",
                id: param.id,
                label: param.id,
                type: param.type,
                uiType: param.ui.type
            });
        }

        for (const output of this.block.outputs) {
            rows.push({
                kind: "output",
                id: output.id,
                label: output.id,
                type: output.type
            });
        }

        return rows;
    }

    onHandleGrab(event: PointerEvent){
        event.stopPropagation()
        this.editorController.onHandleGrab(this.instance, event)
    }

    onFocus(event: PointerEvent){
        this.editorController.bringInstanceToFront(this.instance.id)
    }
}
