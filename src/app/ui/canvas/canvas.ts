import { Component } from '@angular/core';
import { GraphService } from '../../services/graph-service';
import { BlockInstance } from "../block-instance/block-instance";

@Component({
  selector: 'app-canvas',
  imports: [BlockInstance],
  templateUrl: './canvas.html',
  styleUrl: './canvas.scss',
})
export class Canvas {
    constructor(public graphService: GraphService){}

    get instances(){
        return Array.from(this.graphService.getGraph().instances.values());
    }
}
