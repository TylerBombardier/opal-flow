import { Component, Input } from '@angular/core';

import { Instance } from '../../graph/types';
import { ParamSlot } from '../../blocks/types';

@Component({
  selector: 'app-param-renderer',
  imports: [],
  templateUrl: './param-renderer.html',
  styleUrl: './param-renderer.scss',
})
export class ParamRenderer {
    
    @Input() 
    instance!: Instance;
    
    @Input() 
    param!: ParamSlot;

    onTextboxInput(event: Event) {

        const value =
            (event.target as HTMLInputElement).value;

        this.instance.params[this.param.id] = value;
    }

    onCheckboxChange(event: Event){
        const checked = (event.target as HTMLInputElement).checked

        this.instance.params[this.param.id] = checked

        console.log(this.instance.params[this.param.id])
    }
}
