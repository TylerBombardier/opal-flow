import { from } from "rxjs";
import { Block } from "../blocks/blocks";
import { BlockID } from "../blocks/blocks";
import { BlockRegistry } from "../blocks/registry/block-registry";

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
    registry: BlockRegistry

    private visiting = new Set<InstanceID>();
    private cache: Map<InstanceID, Record<string, any>>;

    constructor(registry: BlockRegistry) {
        this.instances = new Map<InstanceID, Instance>();
        this.wires = [];
        this.registry = registry
        this.cache = new Map<InstanceID, Record<string, any>>();
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

        const block = this.registry.get(instance.blockId);
        if (!block) {
            throw new Error(`Block not found: ${instance.blockId}`);
        }

        const inputs: Record<string, any> = {};

        for (const slot of block.inputs) {
            const wire = this.wires.find(
                w => w.to === id && w.toInput === slot.id
            );

            if(!wire){
                inputs[slot.id] = instance.params?.[slot.id];
                continue;
            }

            const fromOutputs = this.run(wire.from);
            const value = fromOutputs?.[wire.fromOutput];

            if (value === undefined) {
                throw new Error(
                    `Missing output '${wire.fromOutput}' from node '${wire.from}'`
                );
            }

            inputs[slot.id] = value;
        }

        const outputs = block.fn(inputs, instance.params ?? {});

        this.cache.set(id, outputs);
        this.visiting.delete(id);

        return outputs;
    }

    clearRuntime(){
        this.cache.clear();
        this.visiting.clear();
    }
}