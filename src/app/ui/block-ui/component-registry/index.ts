import { CheckboxComponent } from "../components/checkbox-component/checkbox-component";
import { SliderComponent } from "../components/slider-component/slider-component";
import { TextboxComponent } from "../components/textbox-component/textbox-component";
import { ComponentRegistry } from "./component-registry";

export const compRegistry = new ComponentRegistry();

export function registerComponents(){
    compRegistry.register(
        "checkbox",
        CheckboxComponent
    )

    compRegistry.register(
        "textbox",
        TextboxComponent
    )

    compRegistry.register(
        "slider",
        SliderComponent
    )
}