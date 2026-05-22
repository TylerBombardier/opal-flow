import { AfterViewInit, Component, ElementRef, Host, HostListener, OnInit, ViewChild } from '@angular/core';
import { GraphService } from '../../services/graph-service';
import { BlockInstance } from "../block-instance/block-instance";
import Panzoom, { PanzoomOptions } from "@panzoom/panzoom";
import { EditorStateService } from '../../services/editor-state-service';
import { EditorControllerService } from '../../services/editor-controller-service';

@Component({
  selector: 'app-canvas',
  imports: [BlockInstance],
  templateUrl: './canvas.html',
  styleUrl: './canvas.scss',
})
export class Canvas implements AfterViewInit{
    constructor(public graphService: GraphService, public editorState: EditorStateService, public editorController: EditorControllerService){}

    @ViewChild('world')
    world!: ElementRef<HTMLDivElement>;

    // Keeps track of user action
    isPanning = false;
    zooming = false;

    ngAfterViewInit() {

        const elem = this.world.nativeElement;

        // Panzoom options
        const options: PanzoomOptions = {
            maxScale: 3,
            minScale: 0.5,
            startX: -1000 + this.editorState.viewportWidth / 2,
            startY: -1000 + this.editorState.viewportHeight / 2,
            excludeClass: "panzoom-exclude"
        }

        // Initializing Panzoom on the 'world' element
        const panzoom = Panzoom(elem, options);

        elem.addEventListener('panzoomchange', (event: any) => {
            this.editorState.transform = {
                x: event.detail.x,
                y: event.detail.y,
                scale: event.detail.scale
            };
        });

        /** Removed Feature. Zoom was giving me way too many complications. 
        Buffers zoom requests to stop a bug that makes the camera jump around
        elem.addEventListener('wheel', (event) => {
            event.preventDefault();

            if (this.zooming || this.isPanning) {
                return;
            }

            this.zooming = true;

            requestAnimationFrame(() => {
                panzoom.zoomWithWheel(event);
                this.zooming = false;
            });
        });
        */
        
        
        // Prevents zooming and panning at the same to stop a bug that makes the world disappear
        elem.addEventListener(
            'panzoomstart',
            () => {
                this.isPanning = true;
                elem.style.cursor = "grabbing"
            }
        );

        elem.addEventListener(
            'panzoomend',
            () => {
                this.isPanning = false;
                elem.style.cursor = "default"
            }
        );
    }

    @HostListener('document:pointermove',['$event'])
    onPointerMove(event: PointerEvent){
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

        instance.position.x = mouse.x - this.editorState.dragOffset.x
        instance.position.y = mouse.y - this.editorState.dragOffset.y
    }

    @HostListener('document:pointerup')
    onPointerUp(){
        this.editorState.draggingInstanceId = null;
    }

    // Returns all instances currently in the graph
    get instances(){
        return Array.from(this.graphService.getGraph().instances.values());
    }
}
