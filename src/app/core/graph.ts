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

    // Recursively calculates the graph
    run(id: InstanceID): any {
        // Already computed that before
        if (this.cache.has(id)) {
            return this.cache.get(id);
        }

        // Cycle detected
        if (this.visiting.has(id)) {
            throw new Error(`Cycle detected at ${id}`);
        }

        this.visiting.add(id);

        // Checks if the instance exists
        const instance = this.instances.get(id);
        if (!instance) {
            throw new Error(`Instance not found: ${id}`);
        }

        // Checks if the block exists
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
                const value = inputs[slot.id] = instance.params?.[slot.id];

                if(value === undefined && slot.required){
                    throw new Error(
                        `Missing required input '${slot.id}' in node '${id}'`
                    )
                }

                inputs[slot.id] = value
                continue;
            }

            const fromOutputs = this.run(wire.from);
            const value = fromOutputs?.[wire.fromOutput];

            if (!(wire.fromOutput in fromOutputs)) {
                throw new Error(
                    `Missing output '${wire.fromOutput}' from node '${wire.from}'`
                );
            }

            inputs[slot.id] = value;
        }

        // Calls the function, saves output.
        const outputs = block.fn(inputs, instance.params ?? {});

        // Stores the outputted value into the cache
        this.cache.set(id, outputs);
        this.visiting.delete(id);

        return outputs;
    }

    clearRuntime(){
        this.cache.clear();
        this.visiting.clear();
    }
}