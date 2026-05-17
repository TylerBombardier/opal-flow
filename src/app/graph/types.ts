import { BlockID } from "../blocks/types";

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
    params: Record<string,any>,
    position: Position
}

export type Position = {
    x: number;
    y: number;
}