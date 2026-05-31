export type WireDrawContext = {
    start: {
        x: number,
        y: number
    }

    end: {
        x: number,
        y: number
    }
}

export interface WireStrategy {
    draw(context: WireDrawContext): string;
}