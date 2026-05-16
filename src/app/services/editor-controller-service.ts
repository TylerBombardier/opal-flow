import { Injectable } from '@angular/core';
import { GraphService } from './graph-service';

@Injectable({
  providedIn: 'root',
})
export class EditorControllerService {
    constructor(public graphService: GraphService){}

    spawnBlock(blockId: string) {
        this.graphService.addInstance(blockId)
    }
}
