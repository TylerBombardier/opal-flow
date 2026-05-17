import { Injectable } from '@angular/core';
import { GraphService } from './graph-service';
import { EditorStateService } from './editor-state-service';

@Injectable({
  providedIn: 'root',
})
export class EditorControllerService {
    constructor(public graphService: GraphService, public editorState: EditorStateService){}

    spawnBlockAtCenter(blockId: string) {
        const center = this.editorState.viewportCenter;

        console.log("Editor Controller Recieved: ",blockId,center)
        this.graphService.addInstance(blockId, { position: center });
    }
}
