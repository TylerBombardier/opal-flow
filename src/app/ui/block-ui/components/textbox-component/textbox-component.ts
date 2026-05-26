import { Component, Input } from '@angular/core';
import { EditorControllerService } from '../../../../services/editor-controller-service';
import { Instance } from '../../../../graph/types';
import { ParamSlot } from '../../../../blocks/types';

@Component({
  selector: 'app-textbox-component',
  imports: [],
  templateUrl: './textbox-component.html',
  styleUrl: './textbox-component.scss',
})
export class TextboxComponent {
    constructor(
        private editorController: EditorControllerService
    ){}

    @Input() 
    instance!: Instance

    @Input()
    param!: ParamSlot

    get value() {
        return this.instance.params[this.param.id] ?? "";
    }

    onInput(event: Event){
        const value = (event.target as HTMLInputElement).value

        console.log(`${this.instance.blockId} ${this.param.id} parameter updated: ${value}`)
        
        this.editorController.setParam(
            this.instance.id,
            this.param.id,
            value
        )
    }
}
