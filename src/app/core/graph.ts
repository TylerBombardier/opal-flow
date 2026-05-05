type InputSlot = {
    id: string;
}

type OutputSlot = {
    id: string;
}

type BlockID = string;

type Block = {
    id: BlockID;

    inputs: InputSlot[];
    outputs: OutputSlot[];

    fn: (inputs: Record<string, any>, params: any) => any;
}


type InstanceID = string;

type Wire = {
    from: InstanceID;
    fromOutput: string;

    to: InstanceID;
    toInput: string;
}

type Instance = {
    id: InstanceID;
    blockId: BlockID;
    params: Record<string,any>
}


class Graph {
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
}

const graph = new Graph();

graph.blocks.set("textInput", {
    id: "textInput",
    inputs: [],
    outputs: [{ id: "out" }],
    fn: (_, params) => params.value
});

graph.blocks.set("uppercase", {
    id: "uppercase",
    inputs: [{ id: "text" }],
    outputs: [{ id: "out" }],
    fn: (inputs) => inputs['text'].toUpperCase()
});

const result = graph.run("n2");

console.log(result);