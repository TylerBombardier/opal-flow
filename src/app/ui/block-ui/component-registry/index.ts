import { CheckboxComponent } from "../components/checkbox-component/checkbox-component";
import { SliderComponent } from "../components/slider-component/slider-component";
import { TextboxComponent } from "../components/textbox-component/textbox-component";
import { ComponentRegistry } from "./component-registry";

export const registry = new ComponentRegistry();

export function registerComponents(){
    registry.register(
        "checkbox",
        CheckboxComponent
    )

    registry.register(
        "textbox",
        TextboxComponent
    )

    registry.register(
        "slider",
        SliderComponent
    )
}