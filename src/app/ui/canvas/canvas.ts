import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { GraphService } from '../../services/graph-service';
import { BlockInstance } from "../block-instance/block-instance";
import Panzoom from "@panzoom/panzoom";
import { EditorStateService } from '../../services/editor-state-service';
import { EditorControllerService } from '../../services/editor-controller-service';

@Component({
  selector: 'app-canvas',
  imports: [BlockInstance],
  templateUrl: './canvas.html',
  styleUrl: './canvas.scss',
})
export class Canvas implements AfterViewInit, OnInit{
    constructor(public graphService: GraphService, public editorState: EditorStateService, public editorController: EditorControllerService){}

    @ViewChild('world')
    world!: ElementRef<HTMLDivElement>;

    // Keeps track of user action
    isPanning = false;
    zooming = false;

    ngOnInit() {
        this.onResize();
    }

    ngAfterViewInit() {

        const elem = this.world.nativeElement;

        // Initializing Panzoom on the 'world' element
        const panzoom = Panzoom(elem, {
            maxScale: 3,
            minScale: 0.5,
            startX: -25000 + this.editorState.viewportWidth / 2,  // Center the 50000px world
            startY: -25000 + this.editorState.viewportHeight / 2,
        });

        elem.addEventListener('panzoomchange', (event: any) => {
            this.editorState.transform = {
                x: event.detail.x,
                y: event.detail.y,
                scale: event.detail.scale
            };
            
            console.log('=== PANZOOM CHANGE ===');
            console.log('Transform:', this.editorState.transform);
            console.log('Viewport center (world coords):', this.editorState.viewportCenter);
        });

        // Buffers zoom requests to stop a bug that makes the camera jump around
        elem.addEventListener(
            'wheel',
            (event) => {

                event.preventDefault();

                if (this.zooming || this.isPanning) {
                    return;
                }

                this.zooming = true;

                requestAnimationFrame(() => {
                    panzoom.zoomWithWheel(event);
                    this.zooming = false;
                });

            }
        );

        // Prevents zooming and panning at the same to stop a bug that makes the world disappear
        elem.addEventListener(
            'panzoomstart',
            () => {
                this.isPanning = true;
            }
        );

        elem.addEventListener(
            'panzoomend',
            () => {
                this.isPanning = false;
            }
        );
    }

    // Updates the current viewport size
    @HostListener('window:resize')
    onResize(){
        this.editorState.viewportWidth = window.innerWidth
        this.editorState.viewportHeight = window.innerHeight
    }

    // Returns all instances currently in the graph
    get instances(){
        return Array.from(this.graphService.getGraph().instances.values());
    }
}
