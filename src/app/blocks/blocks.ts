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

export const BLOCKS: Block[] = [
    textBlock,
    uppercaseBlock
]