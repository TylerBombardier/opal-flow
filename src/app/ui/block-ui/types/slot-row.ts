import { InputSlot, OutputSlot, ParamSlot } from "../../../blocks/types";

export type ValueRow = {
    id: string;
    label: string;
    
    input?: InputSlot
    param?: ParamSlot
}