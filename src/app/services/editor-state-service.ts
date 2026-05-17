import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EditorStateService {
    transform = {
        x: 0,
        y: 0,
        scale: 1
    }

    selectedInstances = new Set<string>();

    draggingInstanceId: string | null = null;

    hoveredInstanceId: string | null = null;

    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;

    get viewportCenter() {
        return {
            x:( this.viewportWidth / 2 - this.transform.x ) / this.transform.scale,

            y:( this.viewportHeight / 2 - this.transform.y ) / this.transform.scale
        };
    }
}
