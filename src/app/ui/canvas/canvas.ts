import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { GraphService } from '../../services/graph-service';
import { BlockInstance } from "../block-instance/block-instance";
import Panzoom from "@panzoom/panzoom";

@Component({
  selector: 'app-canvas',
  imports: [BlockInstance],
  templateUrl: './canvas.html',
  styleUrl: './canvas.scss',
})
export class Canvas implements AfterViewInit{
    constructor(public graphService: GraphService){}

    @ViewChild('world')
    world!: ElementRef<HTMLDivElement>;

    // Keeps track of user action
    isPanning = false;
    zooming = false;

    ngAfterViewInit() {

        const elem = this.world.nativeElement;

        // Initializing Panzoom on the 'world' element
        const panzoom = Panzoom(elem, {
            maxScale: 3,
            minScale: 0.5,
            canvas: true,
            contain: 'outside'
        });
        
        // Buffers zoom requests to stop a bug that makes the camera jump around
        elem.addEventListener(
            'wheel',
            (event) => {

                event.preventDefault();

                if (this.zooming) {
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

    // Returns all instances currently in the graph
    get instances(){
        return Array.from(this.graphService.getGraph().instances.values());
    }
}
