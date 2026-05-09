// All valid types for each slot
export type SlotType = | "string" | "number" | "boolean" | "array" | "object" | "any"

export type ValueSlot = {
    id: string;
    type?: SlotType;
    required?: boolean;
    default?: any;
    label?: string;
    description?: string;
}

export type InputSlot = ValueSlot & {

}

export type OutputSlot = ValueSlot & {

}

export type ParamSlot = ValueSlot & {
    ui?: "textbox" | "slider" | "checkbox"
}

export type BlockID = string;

export type Block = {
    id: BlockID;

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
            default: "",
            ui: "textbox"
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
            default: ""
        },
        {
            id: "text2",
            type: "string",
            required: false
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
                String(inputs['seperator'] ?? "") +
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
            default: ""
        },
        {
            id: "replace",
            type: "string",
            default: ""
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
            default: false,
            ui: "checkbox"
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
            default: 0
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