import { Injectable } from '@angular/core';
import { GraphService } from './graph-service';
import { EditorStateService } from './editor-state-service';
import { Instance } from '../graph/types';

@Injectable({
  providedIn: 'root',
})
export class EditorControllerService {
    constructor(public graphService: GraphService, public editorState: EditorStateService){}

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

    spawnBlockAtCenter(blockId: string) {
        const center = this.editorState.snapPosition(this.editorState.viewportCenterWorld.x,this.editorState.viewportCenterWorld.y);

        // Spawns instance the center of the screen
        this.graphService.addInstance(blockId, {
            position: center
        });
    }

    onCanvasPointerDown(instance: Instance, event: PointerEvent){
        const mouse = this.editorState.screenToWorld(
            event.clientX,
            event.clientY
        )

        this.editorState.draggingInstanceId = instance.id

        this.bringInstanceToFront(instance.id)

        this.editorState.dragOffset = {
            x: mouse.x - instance.position.x,
            y: mouse.y - instance.position.y
        }
    }

    onCanvasPointerMove(event: PointerEvent){
        const id = this.editorState.draggingInstanceId

        if(!id){
            return
        }

        const instance = this.graphService.getGraph().instances.get(id);

        if(!instance){
            return
        }

        const mouse = this.editorState.screenToWorld(
            event.clientX,
            event.clientY
        );
        
        const newXPos = mouse.x - this.editorState.dragOffset.x;
        const newYPos = mouse.y - this.editorState.dragOffset.y;

        const snapped = this.editorState.snapPosition(newXPos,newYPos)

        instance.position.x = snapped.x
        instance.position.y = snapped.y
    }

    onCanvasPointerUp(){
        this.editorState.draggingInstanceId = null;
    }
}
