import { Injectable } from "@angular/core";
import { EditorStateService } from "../../../services/editor-state-service";
import { LinearWireStrategy } from "../strategies/linear/linear-wire-strategy";
import { WireDrawContext, WireStrategy } from "../types/wire-rendering";

@Injectable({ 
    providedIn: 'root' 
})
export class WireRenderer {

    private strategy = new LinearWireStrategy();

    constructor(
        private editorState: EditorStateService,
    ){}

    render(
        {start, end}: WireDrawContext
    ): string {
        return this.strategy.draw({
            start,
            end
        })
    }

    getPreviewPath(): string {
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
