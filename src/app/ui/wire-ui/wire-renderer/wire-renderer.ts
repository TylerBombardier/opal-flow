import { Injectable } from "@angular/core";
import { EditorStateService } from "../../../services/editor-state-service";
import { LinearWireStrategy } from "../strategies/linear/linear-wire-strategy";
import { WireDrawContext, WireStrategy } from "../types/wire-rendering";
import { Wire } from "../../../graph/types";
import { ElementRegistryService } from "../../../services/element-registry-service";

@Injectable({ 
    providedIn: 'root' 
})
export class WireRenderer {

    private strategy = new LinearWireStrategy();

    constructor(
        private editorState: EditorStateService,
        private elementRegistry: ElementRegistryService
    ){}

    render(
        {start, end}: WireDrawContext
    ): string {
        return this.strategy.draw({
            start,
            end
        })
    }

    // Renders established connections between to instances
    renderWire(wire: Wire): string {
        const output = this.elementRegistry.getOutput(wire.from, wire.fromOutput);
        const input = this.elementRegistry.getInput(wire.to, wire.toInput);

        if(!output || !input){
            return ""
        }

        const outputPos = output.getBoundingClientRect();
        const inputPos = input.getBoundingClientRect();

        const start = this.editorState.screenToWorld(
            outputPos.left + outputPos.width / 2,
            outputPos.top + outputPos.height / 2
        )

        const end = this.editorState.screenToWorld(
            inputPos.left + inputPos.width / 2,
            inputPos.top + inputPos.height / 2
        )

        return this.render({
            start,
            end
        })
    }


    // Renders a preview of the wire you're dragging
    renderPreviewWire(): string {
        // Active Wire Drag automaticaly centers the starting position
        const drag = this.editorState.activeWireDrag
        if(!drag) return "";
        
        return this.render({
            start: {
                x: drag.startX,
                y: drag.startY
            },
            end: {
                x: drag.endX,
                y: drag.endY
            }
        });
    }
}
