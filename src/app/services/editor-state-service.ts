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

    gridSize = 16;

    snappingEnabled = true;

    selectedInstances = new Set<string>();

    instanceZIndexs = new Map<string, number>();

    nextZIndex = 1;

    lastBroughtForward: string | null = null;

    draggingInstanceId: string | null = null;

    activeWireDrag: {
        fromInstanceId: string;
        fromOutputId: string;

        startX: number;
        startY: number;

        endX: number;
        endY: number;
    } | null = null;

    dragOffset = {
        x: 0,
        y: 0,
    }

    hoveredInstanceId: string | null = null;

    hoveredInputId: string | null = null;

    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;

    snapPosition(
        x: number,
        y: number
    ){
        if(!this.snappingEnabled){
            return { x, y }
        }

        return {
            x: Math.round(x / this.gridSize ) * this.gridSize,
            y: Math.round(y / this.gridSize ) * this.gridSize
        }
    }

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
