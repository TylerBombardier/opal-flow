import { Component, Input } from '@angular/core';
import { GraphService } from '../../../services/graph-service';
import { Instance } from '../../../graph/types';
import { EditorStateService } from '../../../services/editor-state-service';
import { EditorControllerService } from '../../../services/editor-controller-service';
import { ValueRow } from '../types/slot-row';
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

    get rows(){
        const rows: ValueRow[] = []

        for (const param of this.block.params ?? []) {

            const matchingInput = this.block.inputs.find(
                input => input.id === param.id
            );

            rows.push({
                id: param.id,
                label: param.displayName ?? param.id,

                param,
                input: matchingInput
            });
        }

        for (const input of this.block.inputs) {

            const alreadyMerged = rows.some(
                row => row.input?.id === input.id
            );

            if (alreadyMerged) {
                continue;
            }

            rows.push({
                id: input.id,
                label: input.displayName ?? input.id,

                input
            });
        }
        
        return rows;
    }

    onHandleGrab(event: PointerEvent){
        event.stopPropagation()
        this.editorController.onHandleGrab(this.instance, event)
    }

    onFocus(event: PointerEvent){
        event.stopPropagation()
        this.editorController.bringInstanceToFront(this.instance.id)
    }

    onDeleteBtnPressed(event: PointerEvent){
        event.stopPropagation()
        if(event.button != 0){
            return
        }
        this.editorController.deleteInstance(this.instance.id)
    }

    onOutputPressed(event: PointerEvent, outputID: string){
        console.log("Output pressed: ",outputID)
    }
}
