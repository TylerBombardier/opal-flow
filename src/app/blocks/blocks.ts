import { Block } from "./types";

// Definitions for all blocks

export const textBlock: Block = {
    id: "text",
    displayName: "Text Source",
    category: "Source",

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
    displayName: "Uppercase",
    category: "Transform",

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
    displayName: "Lowercase",
    category: "Transform",

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
    displayName: "Reverse",
    category: "Transform",

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
    displayName: "Concatenation",
    category: "Merge",

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
    displayName: "Split By Case",
    category: "Split",

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
    displayName: "Find & Replace",
    category: "Transform",

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
    displayName: "Switch",
    category: "Source",

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

export const numberBlock: Block = {
    id: "number",
    displayName: "Number",
    category: "Source",

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

export const addBlock: Block = {
    id: "add",
    displayName: "Add",
    category: "Math",

    inputs: [
        { id: "a", type: "number", required: true },
        { id: "b", type: "number", required: true }
    ],

    outputs: [
        { id: "result", type: "number" }
    ],

    fn: (inputs) => ({
        result: inputs['a'] + inputs['b']
    })
};

export const multiplyBlock: Block = {
    id: "multiply",
    displayName: "Multiply",
    category: "Math",

    inputs: [
        { id: "a", type: "number", required: true },
        { id: "b", type: "number", required: true }
    ],

    outputs: [
        { id: "result", type: "number" }
    ],

    fn: (inputs) => ({
        result: inputs['a'] * inputs['b']
    })
};

export const ifBlock: Block = {
    id: "if",
    displayName: "If",
    category: "Logic",

    inputs: [
        { id: "condition", type: "boolean", required: true },
        { id: "trueValue", type: "any", required: false },
        { id: "falseValue", type: "any", required: false }
    ],

    outputs: [
        { id: "result", type: "any" }
    ],

    fn: (inputs) => ({
        result: inputs['condition']
            ? inputs['trueValue']
            : inputs['falseValue']
    })
};