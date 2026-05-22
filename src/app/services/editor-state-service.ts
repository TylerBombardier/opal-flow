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

    dragOffset = {
        x: 0,
        y: 0,
    }

    hoveredInstanceId: string | null = null;

    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;

    get viewportCenterWorld() {
        const screenX = this.viewportWidth / 2;
        const screenY = this.viewportHeight / 2;

        return this.screenToWorld(screenX, screenY);
    }

    get screenToWorld() {
        const t = this.transform;

        return (screenX: number, screenY: number) => ({
            x: (screenX - t.x) / t.scale,
            y: (screenY - t.y) / t.scale
        });
    }

    get worldToScreen() {
        const t = this.transform;

        return (worldX: number, worldY: number) => ({
            x: worldX * t.scale + t.x,
            y: worldY * t.scale + t.y
        });
    }
}
