import { Block, InputSlot, OutputSlot, SlotType } from "../blocks/types";
import { Instance, Wire } from "./types";

export function canConnect(
    from: OutputSlot,
    to: InputSlot
): boolean {
    if(from.type === "any") return true;
    if(to.type === "any") return true;

    return from.type === to.type;
}

export function matchesType(
    value: any,
    type: SlotType
): boolean {
    switch (type) {
        case "string":
            return typeof value === "string";

        case "number":
            return typeof value === "number";

        case "boolean":
            return typeof value === "boolean";

        case "array":
            return Array.isArray(value);

        case "object":
            return typeof value === "object";

        case "any":
            return true;
    }
}

export function coerce(value: any, type: SlotType): any {
        switch(type) {

            case "string":{
                return value == null ? "" : String(value);
            }

            case "number": {
                const n = Number(value);
                return isNaN(n) ? 0 : n;
            }

            case "boolean": {
                return Boolean(value);
            }

            case "array": {
                return Array.isArray(value) ? value : [];
            }

            case "object": {
                return typeof value === "object" && value !== null ? value : {};
            }

            case "any":

            default: {
                return value;
            }
        }
    }

export function validateOutputs(
    block: Block,
    outputs: Record<string, any>
): void {

    for (const slot of block.outputs) {

        // Missing output entirely
        if (!(slot.id in outputs)) {
            throw new Error(
                `Block '${block.id}' missing output '${slot.id}'`
            );
        }

        // Skip type validation
        if (
            !slot.type ||
            slot.type === "any"
        ) {
            continue;
        }

        const value = outputs[slot.id];

        // Wrong runtime type
        if (!matchesType(value, slot.type)) {
            throw new Error(
                `Output '${slot.id}' in block '${block.id}' expected '${slot.type}'`
            );
        }
    }
}

export function validateWire(
    wire: Wire,
    fromInstance: Instance,
    toInstance: Instance,
    fromBlock: Block,
    toBlock: Block
): void {

    // Prevents a self connection
    if (wire.from === wire.to) {
        throw new Error(
            `Cannot connect node to itself`
        );
    }

    const output = fromBlock.outputs.find(
        o => o.id === wire.fromOutput
    );

    if (!output) {
        throw new Error(
            `Output '${wire.fromOutput}' does not exist on block '${fromBlock.id}'`
        );
    }

    const input = toBlock.inputs.find(
        i => i.id === wire.toInput
    );

    if (!input) {
        throw new Error(
            `Input '${wire.toInput}' does not exist on block '${toBlock.id}'`
        );
    }

    if (!canConnect(output, input)) {
        throw new Error(
            `Cannot connect '${output.type}' to '${input.type}'`
        );
    }
}