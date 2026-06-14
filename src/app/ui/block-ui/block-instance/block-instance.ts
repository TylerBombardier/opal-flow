import { Component, Input, OnInit } from '@angular/core';
import { GraphService } from '../../../services/graph-service';
import { Instance } from '../../../graph/types';
import { EditorStateService } from '../../../services/editor-state-service';
import { EditorControllerService } from '../../../services/editor-controller-service';
import { ValueRow } from '../types/slot-row';
import { ParamRenderer } from '../param-renderer/param-renderer';
import { OutputSlot } from "../output-slot/output-slot";
import { InputSlot } from '../input-slot/input-slot';
import { Block, ValueSlot } from '../../../blocks/types';

@Component({
  selector: 'app-block-instance',
  imports: [ParamRenderer, InputSlot, OutputSlot],
  templateUrl: './block-instance.html',
  styleUrl: './block-instance.scss',
})
export class BlockInstance implements OnInit{
    constructor(public graphService: GraphService, public editorState: EditorStateService, public editorController: EditorControllerService){}

    @Input()
    instance!: Instance

    block!: Block;

    outputValues: Record<string, any> = {}

    ngOnInit(): void {
        this.block = this.graphService.getBlock(this.instance.blockId)
        this.rowInputs = this.buildRowInputs();
        this.graphService.graphRan.subscribe(()=>{
            console.log("Updated Output Value: ",this.instance.blockId)
            this.outputValues = this.graphService.getCachedValues(this.instance.id) ?? {}
        })
    }

    rowInputs: ValueRow[] = []

    private buildRowInputs(): ValueRow[] {
        // console.log("row inputs getter")

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

    outputLabel(output: ValueSlot){
        return output.displayName ?? output.id
    }

    onHandleGrab(event: PointerEvent){
        event.stopPropagation()

        this.editorController.closeContextMenu()

        this.editorController.onHandleGrab(this.instance, event)
    }

    onFocus(event: PointerEvent){
        event.stopPropagation()

        this.editorController.closeContextMenu()

        this.editorController.bringInstanceToFront(this.instance.id)
    }

    onDeleteBtnPressed(event: PointerEvent){
        event.stopPropagation()
        if(event.button != 0){
            return
        }
        this.editorController.deleteInstance(this.instance.id)
    }

    onContextMenu(event: PointerEvent){
        event.stopPropagation()
        event.preventDefault()

        this.editorController.openContextMenu(
            event,
            this.instance.id
        );
    }
}
