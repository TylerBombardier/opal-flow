export type InputSlot = {
    id: string;
}

export type OutputSlot = {
    id: string;
}

export type BlockID = string;

export type Block = {
    id: BlockID;

    inputs: InputSlot[];
    outputs: OutputSlot[];

    fn: (inputs: Record<string, any>, params: any) => any;
}

export const textBlock: Block = {
    id: "text",
    inputs: [],
    outputs: [{ id: "out" }],
    fn: (_, params) => params.value
};

export const uppercaseBlock: Block = {
    id: "uppercase",
    inputs: [{ id: "text" }],
    outputs: [{ id: "out" }],
    fn: (inputs) => inputs['text'].toUpperCase()
};

export const lowercaseBlock: Block = {
    id: "lowercase",
    inputs: [{ id: "text" }],
    outputs: [{ id: "out" }],
    fn: (inputs) => inputs['text'].toLowerCase()
};

export const reverseBlock: Block = {
    id: "reverse",
    inputs: [{id: "text"}],
    outputs: [{id: "out"}],
    fn: (inputs) => inputs['text'].split('').reverse().join('')
}


export const concatBlock: Block = {
    id: "concat",
    inputs: [
        { id: "text" },
        { id: "separator" },
        { id: "text2" }
    ],
    outputs: [{ id: "out" }],
    fn: (inputs) => {
        const a = inputs['text'] ?? '';
        const sep = inputs['separator'] ?? '';
        const b = inputs['text2'] ?? '';

        return String(a) + String(sep) + String(b);
    }
};