export type SlotRow = | InputRow | ParamRow | OutputRow;

export type InputRow = {
    kind: "input";
    id: string;
    label: string;
    type: string;
}

export type ParamRow = {
    kind: "param";
    id: string;
    label: string;
    type: string;
    uiType: string;
}

export type OutputRow = {
    kind: "output";
    id: string;
    label: string;
    type: string;
}