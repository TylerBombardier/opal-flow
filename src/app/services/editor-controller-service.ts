import { Injectable } from '@angular/core';
import { GraphService } from './graph-service';
import { EditorStateService } from './editor-state-service';

@Injectable({
  providedIn: 'root',
})
export class EditorControllerService {
    constructor(public graphService: GraphService, public editorState: EditorStateService){}

    spawnBlockAtCenter(blockId: string) {
        const center = this.editorState.viewportCenterWorld;

        this.graphService.addInstance(blockId, {
            position: center
        });
    }

    bringInstanceToFront(instanceId: string){
        // Doesn't bring foward if already brought forward last time. So you can't rapdily increase one instance's z-index.
        if(this.editorState.lastBroughtForward == instanceId){
            return
        }

        // Sets the z-index of that instance and records it in the state
        this.editorState.instanceZIndexs.set(
            instanceId,
            this.editorState.nextZIndex++
        );

        // Logs the latest brought forward instance
        this.editorState.lastBroughtForward = instanceId
    }
}
