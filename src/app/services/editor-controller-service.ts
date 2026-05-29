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
        console.log("Instance Focused: ", this.graphService.getGraph().instances.get(instanceId)?.blockId)

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
        console.log("Spawned block at center: ",blockId)
        const center = this.editorState.snapPosition(this.editorState.viewportCenterWorld.x,this.editorState.viewportCenterWorld.y);

        // Spawns instance the center of the screen
        this.graphService.addInstance(blockId, {
            position: center
        });
    }

    deleteInstance(instanceId: string){
        this.graphService.removeInstance(instanceId)
    }

    onHandleGrab(instance: Instance, event: PointerEvent){
        console.log("Instance Handle Grabbed",instance.blockId)

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

    dragInstance(event: PointerEvent){
        const id = this.editorState.draggingInstanceId

        if(!id){
            return
        }

        console.log("Dragging Instance: ", this.graphService.getGraph().instances.get(id)?.blockId)

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

    dropInstance(){
        if(this.editorState.draggingInstanceId != null){
            console.log("Stopped dragging instance")
            this.editorState.draggingInstanceId = null;
        }
    }

    setParam(
        instanceId: string,
        paramId: string,
        value: unknown
    ){
        const instance = this.graphService.getGraph().instances.get(instanceId);

        if (!instance) {
            return
        }

        instance.params[paramId] = value
    }

    onPointerMove(event: PointerEvent){
        if(this.editorState.draggingInstanceId){
            this.dragInstance(event)
        }

        if(this.editorState.activeWireDrag){
            this.dragWire()
        }
    }

    onPointerUp(event: PointerEvent){
        this.dropInstance()
    }

    startDragWire(
        event: PointerEvent, 
        instanceId: string, 
        outputId: string
    ){
        const el = event.currentTarget as HTMLElement
        const rect = el.getBoundingClientRect();

        const x = rect.left + rect.width / 2
        const y = rect.top + rect.height / 2

        this.editorState.activeWireDrag = {
            fromInstanceId: instanceId,
            fromOutputId: outputId,

            startX: x,
            startY: y,

            mouseX: x,
            mouseY: y
        }

        console.log("Started wire drag: ",this.editorState.activeWireDrag)
    }

    dragWire(){

    }
}
