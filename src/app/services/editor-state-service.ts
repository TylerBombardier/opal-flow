import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EditorStateService {
    panX = 0;
    panY = 0;

    zoom = 1;

    selectedInstances = new Set<string>();

    draggingInstanceId: string | null = null;

    hoveredInstanceId: string | null = null;

    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;

    getViewportCenterWorldPosition() {
        return {
            x:( this.viewportWidth / 2 - this.panX ) / this.zoom,

            y:( this.viewportHeight / 2 - this.panY ) / this.zoom
        };
    }
}
