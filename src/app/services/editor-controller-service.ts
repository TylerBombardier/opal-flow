import { Injectable } from '@angular/core';
import { GraphService } from './graph-service';
import { EditorStateService } from './editor-state-service';
import { Instance } from '../graph/types';

@Injectable({
  providedIn: 'root',
})
export class EditorControllerService {
    constructor(public graphService: GraphService, public editorState: EditorStateService){}

    /**
     * GLOBAL METHODS
     */

    /**
     * Global method, called every time the pointer moves.
     * @param event 
     */
    onPointerMove(event: PointerEvent){
        if(this.editorState.draggingInstanceId){
            this.dragInstance(event)
        }

        if(this.editorState.activeWireDrag){
            this.dragWire(event)
        }
    }

    /**
     * Global method, called every time the pointer stops clicking
     * @param event 
     */
    onPointerUp(event: PointerEvent){
        this.dropInstance()
        this.stopDragWire()
    }

    /**
     * BLOCKS
     */

    /**
     * Spawns an instance located at the center of your screen
     * @param blockId 
     */
    spawnBlockAtCenter(blockId: string) {
        console.log("Spawned block at center: ",blockId)
        const center = this.editorState.snapPosition(this.editorState.viewportCenterWorld.x,this.editorState.viewportCenterWorld.y);

        // Spawns instance the center of the screen
        this.graphService.addInstance(blockId, {
            position: center
        });
    }

    /**
     * Deletes an instance from the Graph
     * @param instanceId 
     */
    deleteInstance(instanceId: string){
        this.graphService.removeInstance(instanceId)
    }

    /**
     * Increments the Z-index of an instance
     * @param instanceId 
     * @returns 
     */
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

    /**
     * Start Instance Dragging
     * @param instance 
     * @param event 
     */

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

    /**
     * Handles Instance Dragging
     * @param event 
     * @returns 
     */
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

    /**
     * Stops Dragging the Instance
     */
    dropInstance(){
        if(this.editorState.draggingInstanceId != null){
            console.log("Stopped dragging instance")
            this.editorState.draggingInstanceId = null;
        }
    }

    /**
     * PARAMETERS
     */

    /**
     * Sets the parameter to a value for a given param and instance id.
     * @param instanceId 
     * @param paramId 
     * @param value 
     * @returns 
     */
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

    /**
     * WIRES
     */

    /**
     * Starts the process of dragging a wire
     * @param event 
     * @param instanceId 
     * @param outputId 
     */
    startDragWire(
        event: PointerEvent, 
        instanceId: string, 
        outputId: string
    ){
        const el = event.currentTarget as HTMLElement
        const rect = el.getBoundingClientRect();

        const { x, y } = this.editorState.screenToWorld(rect.left + rect.width / 2, rect.top + rect.height / 2)

        this.editorState.activeWireDrag = {
            fromInstanceId: instanceId,
            fromOutputId: outputId,

            startX: x,
            startY: y,

            endX: x,
            endY: y
        }

        console.log("Started wire drag: ",this.editorState.activeWireDrag)
    }

    dragWire(event: PointerEvent){
        const drag = this.editorState.activeWireDrag

        if(!drag){
            return
        }

        const { x, y } = this.editorState.screenToWorld(event.clientX, event.clientY)

        drag.endX = x
        drag.endY = y

        console.log("Dragging Wire",drag)
    }

    stopDragWire(){
        const drag = this.editorState.activeWireDrag;

        const target = this.editorState.hoveredInputId;

        if(drag && target){
            this.graphService.addWire(
                drag.fromInstanceId,
                drag.fromOutputId,
                target.instanceId,
                target.inputId
            )
        }

        this.editorState.activeWireDrag = null;
        this.editorState.clearHoveredInput();
        console.log("Stopped Dragging Wire")
    }
}
