import { AfterViewInit, Component, ElementRef, Host, HostListener, OnInit, ViewChild } from '@angular/core';
import { GraphService } from '../../../services/graph-service';
import { BlockInstance } from "../../block-ui/block-instance/block-instance";
import Panzoom, { PanzoomOptions } from "@panzoom/panzoom";
import { EditorStateService } from '../../../services/editor-state-service';
import { EditorControllerService } from '../../../services/editor-controller-service';
import { WireRenderer } from '../../wire-ui/wire-renderer/wire-renderer';

@Component({
  selector: 'app-canvas',
  imports: [BlockInstance],
  templateUrl: './canvas.html',
  styleUrl: './canvas.scss',
})
export class Canvas implements AfterViewInit{
    constructor(
        public wireRenderer: WireRenderer, 
        public graphService: GraphService, 
        public editorState: EditorStateService, 
        public editorController: EditorControllerService
    ){}

    @ViewChild('world')
    world!: ElementRef<HTMLDivElement>;

    // Keeps track if the user is panning or zooming
    isPanning = false;
    zooming = false;

    ngAfterViewInit() {
        // The element that contains the transforming world
        const elem = this.world.nativeElement;

        // Panzoom options
        const options: PanzoomOptions = {
            maxScale: 1,
            minScale: 1,
            startX: -1000 + this.editorState.viewportWidth / 2,
            startY: -1000 + this.editorState.viewportHeight / 2,
            excludeClass: "panzoom-exclude"
        }

        // Initializing Panzoom on the 'world' element
        const panzoom = Panzoom(elem, options);

        // Keeps track of panzoom state
        elem.addEventListener('panzoomchange', (event: any) => {
            this.editorState.transform = {
                x: event.detail.x,
                y: event.detail.y,
                scale: event.detail.scale
            };
        });

        //Removed Feature. Zoom was giving me way too many complications.
        //Buffers zoom requests to stop a bug that makes the camera jump around
        // elem.addEventListener('wheel', (event) => {
        //     event.preventDefault();

        //     if (this.zooming || this.isPanning) {
        //         return;
        //     }

        //     this.zooming = true;

        //     requestAnimationFrame(() => {
        //         panzoom.zoomWithWheel(event);
        //         this.zooming = false;
        //     });
        // });
        
        
        
        // Detects If the user is panning
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

    // Handles dragging the current instance.
    @HostListener('document:pointermove',['$event'])
    onPointerMove(event: PointerEvent){
        this.editorController.onPointerMove(event)
    }

    // Handles stopping the instance from being dragged.
    @HostListener('document:pointerup',['$event'])
    onPointerUp(event: PointerEvent){
        this.editorController.onPointerUp(event)
    }

    // Returns all instances currently in the graph
    get instances(){
        return this.graphService.getAllInstances();
    }

    get wires(){
        return this.graphService.getAllWires();
    }
}
