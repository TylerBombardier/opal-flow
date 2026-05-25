import { Type } from "@angular/core";

export class ComponentRegistry {
    private components = new Map<string, Type<any>>();

    register(
        key: string,
        component: Type<any>
    ) {
        this.components.set(key, component);
    }

    get(key: string) {
        return this.components.get(key);
    }

    has(key: string) {
        return this.components.has(key);
    }
}
