import { UIConfig } from "./ui-config";

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
    ui?: UIConfig;
    editable?: boolean;
}

export type BlockID = string;

export type Block = {
    id: BlockID;

    category?: string;
    keywords?: string[];

    inputs: InputSlot[];
    params?: ParamSlot[];

    outputs: OutputSlot[];

    fn: (
        inputs: Record<string, any>,
        params: Record<string, any>
    ) => Record<string, any>;
}

export const textBlock: Block = {
    id: "text",

    inputs: [],

    params: [
        {
            id: "value",
            type: "string",
            defaultValue: "",
            ui: {
                type: "textbox"
            }
        }
    ],

    outputs: [
        { 
            id: "out", 
            type: "string"
        }
    ],

    fn: (_, params) => {
        return { 
            out: params['value']
        }
    }
};

export const uppercaseBlock: Block = {
    id: "uppercase",

    inputs: [
        {
            id: "text",
            type: "string",
            required: true
        }
    ],

    outputs: [
        {
            id: "out",
            type: "string"
        }
    ],

    fn: (inputs) => {
        return {
            out: String(inputs['text'] ?? "").toUpperCase()
        };
    }
};

export const lowercaseBlock: Block = {
    id: "lowercase",

    inputs: [
        {
            id: "text",
            type: "string",
            required: true
        }
    ],

    outputs: [
        {
            id: "out",
            type: "string"
        }
    ],

    fn: (inputs) => {
        return {
            out: String(inputs['text'] ?? "").toLowerCase()
        };
    }
};

export const reverseBlock: Block = {
    id: "reverse",

    inputs: [
        {
            id: "text",
            type: "string",
            required: true
        }
    ],

    outputs: [
        {
            id: "out",
            type: "string"
        }
    ],

    fn: (inputs) => {
        const str = String(inputs['text'] ?? "");

        return {
            out: str.split("").reverse().join("")
        };
    }
};

export const concatBlock: Block = {
    id: "concat",

    inputs: [
        {
            id: "text",
            type: "string",
            required: false
        },
        {
            id: "separator",
            type: "string",
            defaultValue: ""
        },
        {
            id: "text2",
            type: "string",
            required: false
        }
    ],

    params: [
        {
            id: "text",
            type: "string",
            ui: {
                type: "textbox"
            }
        },
        {
            id: "separator",
            type: "string",
            ui: {
                type: "textbox"
            }
        },
        {
            id: "text2",
            type: "string",
            ui: {
                type: "textbox"
            }
        }
    ],

    outputs: [
        {
            id: "out",
            type: "string"
        }
    ],

    fn: (inputs) => {
        return {
            out:
                String(inputs['text'] ?? "") +
                String(inputs['separator'] ?? "") +
                String(inputs['text2'] ?? "")
        };
    }
};

export const splitCaseBlock: Block = {
    id: "splitCase",

    inputs: [
        {
            id: "text",
            type: "string",
            required: true
        }
    ],

    outputs: [
        {
            id: "upper",
            type: "string"
        },
        {
            id: "lower",
            type: "string"
        }
    ],

    fn: (inputs) => {
        const text = String(inputs['text'] ?? "");

        return {
            upper: text.toUpperCase(),
            lower: text.toLowerCase()
        };
    }
};

export const findReplaceBlock: Block = {
    id: "findReplace",

    inputs: [
        {
            id: "text",
            type: "string",
            required: true
        },
        {
            id: "find",
            type: "string",
            defaultValue: ""
        },
        {
            id: "replace",
            type: "string",
            defaultValue: ""
        }
    ],

    params: [
        {
            id: "find",
            type: "string",
            ui: {
                type: "textbox"
            }
        },
        {
            id: "replace",
            type: "string",
            ui: {
                type: "textbox"
            }
        }
    ],

    outputs: [
        {
            id: "out",
            type: "string"
        }
    ],

    fn: (inputs) => {
        const text = String(inputs['text'] ?? "");
        const find = String(inputs['find'] ?? "");
        const replace = String(inputs['replace'] ?? "");

        return {
            out: text.replaceAll(find, replace)
        };
    }
};

export const booleanEchoBlock: Block = {
    id: "booleanEcho",

    inputs: [],

    params: [
        {
            id: "value",
            type: "boolean",
            defaultValue: false,
            ui: {
                type: "checkbox"
            }
        }
    ],

    outputs: [
        {
            id: "out",
            type: "boolean"
        }
    ],

    fn: (_, params) => ({
        out: params['value']
    })
};

export const requiredTextBlock: Block = {
    id: "requiredText",

    inputs: [
        {
            id: "text",
            type: "string",
            required: true
        }
    ],

    outputs: [
        {
            id: "out",
            type: "string"
        }
    ],

    fn: (inputs) => ({
        out: inputs['text']
    })
};

export const numberBlock: Block = {
    id: "number",

    inputs: [],

    params: [
        {
            id: "value",
            type: "number",
            defaultValue: 0
        }
    ],

    outputs: [
        {
            id: "out",
            type: "number"
        }
    ],

    fn: (_, params) => ({
        out: params['value']
    })
};