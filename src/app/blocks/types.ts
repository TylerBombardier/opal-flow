import { UIConfig } from "../ui/block-ui/components/ui-config";

// All valid types for each slot
export type SlotType = | "string" | "number" | "boolean" | "array" | "object" | "any"

// Master interface for all slots
export type ValueSlot = {
    id: string;

    type: SlotType;

    displayName?: string;
    description?: string;

    required?: boolean;

    defaultValue?: any;

    hidden?: boolean;
}

export type InputSlot = ValueSlot & {

}

export type OutputSlot = ValueSlot & {

}

export type ParamSlot = ValueSlot & {
    ui: UIConfig;
    editable?: boolean;
}

export type BlockID = string;

// Block Interface
export type Block = {
    id: BlockID;

    displayName?: string;
    description?: string;

    category?: string;
    keywords?: string[];

    pure?: boolean;

    inputs: InputSlot[];
    params?: ParamSlot[];

    outputs: OutputSlot[];

    fn: (
        inputs: Record<string, any>,
        params: Record<string, any>
    ) => Record<string, any>;
}