import { Block } from "../blocks/blocks";
import { BlockID } from "../blocks/blocks";

export type InstanceID = string;

export type Wire = {
    from: InstanceID;
    fromOutput: string;

    to: InstanceID;
    toInput: string;
}

export type Instance = {
    id: InstanceID;
    blockId: BlockID;
    params: Record<string,any>
}


export class Graph {
    instances: Map<InstanceID, Instance>
    wires: Wire[]
    blocks: Map<string, Block>

    private visiting = new Set<InstanceID>();
    private cache: Map<InstanceID, any>;

    constructor() {
        this.instances = new Map<InstanceID, Instance>();
        this.wires = [];
        this.blocks = new Map<string, Block>();
        this.cache = new Map<InstanceID, any>();
    }

    // recursively calculates the graph
    run(id: InstanceID): any {
        // already computed
        if (this.cache.has(id)) {
            return this.cache.get(id);
        }

        // cycle detected
        if (this.visiting.has(id)) {
            throw new Error(`Cycle detected at ${id}`);
        }

        this.visiting.add(id);

        const instance = this.instances.get(id);
        if (!instance) {
            throw new Error(`Instance not found: ${id}`);
        }

        const block = this.blocks.get(instance.blockId);
        if (!block) {
            throw new Error(`Block not found: ${instance.blockId}`);
        }

        const inputs: Record<string, any> = {};

        for (const slot of block.inputs) {
            const wire = this.wires.find(
                w => w.to === id && w.toInput === slot.id
            );

            if (wire) {
                inputs[slot.id] = this.run(wire.from);
            } else {
                inputs[slot.id] = instance.params?.[slot.id];
            }
        }

        const result = block.fn(inputs, instance.params);

        this.visiting.delete(id);
        this.cache.set(id, result);

        return result;
    }

    clearRuntime(){
        this.cache.clear();
        this.visiting.clear();
    }
}