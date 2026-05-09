export type UIConfig = | TextboxUI | SliderUI | CheckboxUI

export type TextboxUI = {
    type: "textbox",
    placeholder?: string;
    multiline?: boolean;
}

export type SliderUI = {
    type: "slider";

    min: number;
    max: number;

    step?: number;
};

export type CheckboxUI = {
    type: "checkbox";
};
