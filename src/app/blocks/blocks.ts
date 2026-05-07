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

    fn: (inputs: Record<string, any>, params: any) => Record<string, any>;
}

export const textBlock: Block = {
    id: "text",
    inputs: [],
    outputs: [{ id: "out" }],
    fn: (_, params) => {
        return { out: params.value }
    }
};

export const uppercaseBlock: Block = {
    id: "uppercase",
    inputs: [{ id: "text" }],
    outputs: [{ id: "out" }],
    fn: (inputs) =>  { 
        return { out: inputs['text'].toUpperCase() } 
    }
};

export const lowercaseBlock: Block = {
    id: "lowercase",
    inputs: [{ id: "text" }],
    outputs: [{ id: "out" }],
    fn: (inputs) => {
        return {
            out: inputs['text'].toLowerCase()
        }
    }
};

export const reverseBlock: Block = {
    id: "reverse",
    inputs: [{id: "text"}],
    outputs: [{id: "out"}],
    fn: (inputs) => {
        return {
            out: inputs['text'].split('').reverse().join('')
        }
    }
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

        return {
            out: String(a) + String(sep) + String(b)
        };
    }
};

export const splitCaseBlock: Block = {
    id: "splitCase",
    inputs: [{ id: "text" }],
    outputs: [
        { id: "upper" },
        { id: "lower" }
    ],
    fn: (inputs) => {
        const text = inputs["text"] ?? "";

        return {
            upper: String(text).toUpperCase(),
            lower: String(text).toLowerCase()
        };
    }
};

export const findReplaceBlock: Block = {
    id: "findReplace",
    inputs: [
        { id: "text" },
        { id: "find" },
        { id: "replace" }
    ],
    outputs: [{ id: "out" }],
    fn: (inputs) => {
        const text = String(inputs["text"] ?? "");
        const find = String(inputs["find"] ?? "");
        const replace = String(inputs["replace"] ?? "");

        return {
            out: text.replaceAll(find, replace)
        };
    }
};