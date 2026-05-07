import { Injectable } from '@angular/core';
import { Graph } from '../core/graph';
import { registerBlocks, registry } from '../blocks';

@Injectable({
  providedIn: 'root',
})
export class GraphService {
    private graph: Graph;

    constructor(){
        
        registerBlocks();
        this.graph = new Graph(registry.getMap());
        
    }

    run(instanceId: string){
        this.graph.clearRuntime();
        return this.graph.run(instanceId);
    }

    reset(){
        this.graph = new Graph(registry.getMap());
    }

    addInstance(blockId: string, params: Record<string, any> = {}) {
        const id = crypto.randomUUID();

        if (!this.graph.blocks.has(blockId)) {
            throw new Error(`Block not found: ${blockId}`);
        }

        this.graph.instances.set(id, {
            id,
            blockId,
            params
        });

        return id;
    }

    addWire(
        from: string,
        fromOutput: string,
        to: string,
        toInput: string
    ) {
        // optional validation
        if (!this.graph.instances.has(from)) {
            throw new Error(`Source instance not found: ${from}`);
        }

        if (!this.graph.instances.has(to)) {
            throw new Error(`Target instance not found: ${to}`);
        }

        const targetInstance = this.graph.instances.get(to)!;
        const block = this.graph.blocks.get(targetInstance.blockId)!;

        const validInput = block.inputs.some(i => i.id === toInput);
        if (!validInput) {
            throw new Error(`Invalid input '${toInput}' for block '${block.id}'`);
        }

        // enforce: one wire per input slot
        this.graph.wires = this.graph.wires.filter(
            w => !(w.to === to && w.toInput === toInput)
        );

        this.graph.wires.push({
            from,
            fromOutput,
            to,
            toInput
        });
    }

    removeInstance(id: string) {
        this.graph.instances.delete(id);

        // remove related wires
        this.graph.wires = this.graph.wires.filter(
            w => w.from !== id && w.to !== id
        );
    }

    removeWire(from: string, to: string, toInput: string) {
        this.graph.wires = this.graph.wires.filter(
            w => !(w.from === from && w.to === to && w.toInput === toInput)
        );
    }
}
