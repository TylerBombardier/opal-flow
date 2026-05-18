import { Component, Input } from '@angular/core';
import { GraphService } from '../../services/graph-service';
import { Instance } from '../../graph/types';

@Component({
  selector: 'app-block-instance',
  imports: [],
  templateUrl: './block-instance.html',
  styleUrl: './block-instance.scss',
})
export class BlockInstance {
    constructor(public graphService: GraphService){}

    @Input()
    instance!: Instance

    get block(){
        return this.graphService.getGraph().registry.get(this.instance.blockId)
    }

    onMouseDown(event: MouseEvent){
        event.preventDefault()
        event.stopPropagation()
    }
}
