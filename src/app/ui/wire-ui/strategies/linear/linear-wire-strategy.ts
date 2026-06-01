import { WireDrawContext, WireStrategy } from "../../types/wire-rendering";

export class LinearWireStrategy implements WireStrategy{
    draw(context: WireDrawContext): string {
        const { start, end } = context;
        return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
    }
}
