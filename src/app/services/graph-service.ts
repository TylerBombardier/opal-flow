import { Injectable } from '@angular/core';
import { Graph } from '../core/graph';
import { registerBlocks, registry } from '../blocks';
import { SlotType } from '../blocks/blocks';

@Injectable({
  providedIn: 'root',
})
export class GraphService {
    private graph: Graph;

    constructor(){
        registerBlocks(); // Loads all predefined blocks
        this.graph = new Graph(registry);
    }


    run(instanceId: string){
        // Clears previous graph runtime information, and runs the graph.
        this.graph.clearRuntime();
        return this.graph.run(instanceId);
    }

    reset(){
        this.graph = new Graph(registry);
    }

    addInstance(blockId: string, params: Record<string, any> = {}) {
        const id = crypto.randomUUID(); // Generates an ID for that instance

        const block = this.graph.registry.get(blockId);

        // Validates that instance has a valid block
        if (!block) {
            throw new Error(`Block not found: ${blockId}`);
        }

        const finalParams: Record<string, any> = {};

        for (const slot of block.params ?? []) {

            const raw =
                params[slot.id] ??
                slot.default;

            finalParams[slot.id] = this.coerce(
                raw,
                slot.type ?? "any"
            );
        }

        // Adds instance to graph
        this.graph.instances.set(id, {
            id,
            blockId,
            params: finalParams
        });

        // Returns generated instance Id
        return id;
    }

    addWire(
        from: string,
        fromOutput: string,
        to: string,
        toInput: string
    ) {
        // Validates Both Instances Exist
        if (!this.graph.instances.has(from)) {
            throw new Error(`Source instance not found: ${from}`);
        }

        if (!this.graph.instances.has(to)) {
            throw new Error(`Target instance not found: ${to}`);
        }

        const sourceInstance = this.graph.instances.get(from)!;
        const targetInstance = this.graph.instances.get(to)!;

        const sourceBlock = this.graph.registry.get(sourceInstance.blockId)!;
        const targetBlock = this.graph.registry.get(targetInstance.blockId)!;

        // Validate Slot Input Exists
        const inputSlot = targetBlock.inputs.find(
            i => i.id === toInput
        )

        if (!inputSlot) {
            throw new Error(`Invalid input '${toInput}' for block '${targetBlock.id}'`);
        }

        const outputSlot = sourceBlock.outputs.find(
            o => o.id === fromOutput
        )

        if(!outputSlot){
            throw new Error(
                `Invalid input '${toInput}' for block '${targetBlock.id}'`
            );
        }

        // Slot Type Validation
        const outputType = outputSlot.type ?? "any";
        const inputType = inputSlot.type ?? "any";

        if(
            outputType !== "any" &&
            inputType !== "any" && 
            outputType !== inputType
        ){
            throw new Error(
                `Type mismatch: ${outputType} -> ${inputType}`
            );
        }


        // Enforces one wire per InputSlot
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

        // Removes the related wires to that instance
        this.graph.wires = this.graph.wires.filter(
            w => w.from !== id && w.to !== id
        );
    }

    removeWire(from: string, to: string, toInput: string) {
        // Removes the wire.
        this.graph.wires = this.graph.wires.filter(
            w => !(w.from === from && w.to === to && w.toInput === toInput)
        );
    }

    private coerce(value: any, type: SlotType): any {
        switch(type) {

            case "string":
                return value == null
                    ? ""
                    : String(value);

            case "number": {
                const n = Number(value);
                return isNaN(n) ? 0 : n;
            }

            case "boolean":
                return Boolean(value);

            case "array":
                return Array.isArray(value)
                    ? value
                    : [];

            case "object":
                return typeof value === "object" && value !== null
                    ? value
                    : {};

            case "any":
            default:
                return value;
        }
    }
}
