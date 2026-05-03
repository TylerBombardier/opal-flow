/**
 * BLOCK INTERFACE
 */

type ParamDef = {
    name: string;
    type: string;
    default: unknown;
    wireable?: boolean;
}

type Ports = {
    mainIn: boolean;
    mainOut: boolean;
    paramPorts?: string[];
    mergeInputs?: boolean;
};

type Block<Input, Params, Output> = {
    id: string;
    label: string;
    category: string;
    ports: Ports;
    params: ParamDef[];
    fn: (input: Input, params: Params) => Output;
}

/**
 * BLOCK DEFINITIONS
 */

/**
 * Source Blocks
 */

type TextParams = {
    value: string;
};

export const textInput: Block<void, TextParams, string> = {
    id: "textInput",
    label: "Text Input",
    category: "source",
    ports: { mainIn: false, mainOut: true },
    params: [
        { name: "value", type: "text", default: ""}
    ],
    fn: (_, params) => params.value
};

/**
 * Transform Blocks
 */

export const uppercase: Block<string, {}, string> = {
    id: "uppercase",
    label: "Uppercase",
    category: "transform",
    ports: { mainIn: true, mainOut: true },
    params: [],
    fn: (input) => input.toUpperCase()
};

/**
 * Encode Blocks
 */



/**
 * Merge Blocks
 */



/**
 * Filter Blocks
 */

