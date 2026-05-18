import { Injectable } from '@angular/core';
import { GraphService } from './graph-service';
import { EditorStateService } from './editor-state-service';

@Injectable({
  providedIn: 'root',
})
export class EditorControllerService {
    constructor(public graphService: GraphService, public editorState: EditorStateService){}

    spawnBlockAtCenter(blockId: string) {
        const pos = this.editorState.viewportCenterWorld;

        this.graphService.addInstance(blockId, {
            position: pos
        });
    }
}
