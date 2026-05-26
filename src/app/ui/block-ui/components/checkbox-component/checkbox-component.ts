import { Component, Input } from '@angular/core';
import { Instance } from '../../../../graph/types';
import { ParamSlot } from '../../../../blocks/types';
import { EditorControllerService } from '../../../../services/editor-controller-service';

@Component({
  selector: 'app-checkbox-component',
  imports: [],
  templateUrl: './checkbox-component.html',
  styleUrl: './checkbox-component.scss',
})
export class CheckboxComponent {
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

    onChange(event: Event){
        const checked = (event.target as HTMLInputElement).checked

        console.log(`${this.instance.blockId} ${this.param.id} parameter updated: ${checked}`)
        
        this.editorController.setParam(
            this.instance.id,
            this.param.id,
            checked
        )
    }
}
