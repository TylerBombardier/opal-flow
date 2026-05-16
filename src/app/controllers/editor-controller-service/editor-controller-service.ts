import { Component } from '@angular/core';
import { GraphService } from '../../services/graph-service';

@Component({
  selector: 'app-editor-controller-service',
  imports: [],
  templateUrl: './editor-controller-service.html',
  styleUrl: './editor-controller-service.scss',
})
export class EditorControllerService {
    constructor(private graphService: GraphService){}

    spawnBlock(blockId: string) {
        this.graphService.addInstance(blockId)
    }
}
