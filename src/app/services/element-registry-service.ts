import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class ElementRegistryService {

    inputElements = new Map<string, HTMLElement>

    outputElements = new Map<string, HTMLElement>

    private slotKey(
        instanceId: string,
        slotId: string
    ): string {
        return `${instanceId}:${slotId}`
    }

    // Register Inputs

    registerInput(
        instanceId: string,
        slotId: string,
        element: HTMLElement
    ){
        console.log(`Registered Input: ${instanceId}:${slotId} `)
        this.inputElements.set(
            this.slotKey(instanceId,slotId),
            element
        );
    }

    unregisterInput(
        instanceId: string,
        slotId: string
    ){
        console.log(`Unregisted Input: ${instanceId}:${slotId} `)
        this.inputElements.delete(
            this.slotKey(instanceId,slotId)
        )
    }

    getInput(
        instanceId: string,
        slotId: string
    ){
        return this.inputElements.get(
            this.slotKey(instanceId,slotId)
        )
    }

    // Register Outputs

    registerOutput(
        instanceId: string,
        slotId: string,
        element: HTMLElement
    ){
        console.log(`Registered Output: ${instanceId}:${slotId} `)
        this.outputElements.set(
            this.slotKey(instanceId,slotId),
            element
        );
    }

    unregisterOutput(
        instanceId: string,
        slotId: string
    ){
        console.log(`Unregistered Output: ${instanceId}:${slotId} `)
        this.outputElements.delete(
            this.slotKey(instanceId,slotId)
        );
    }

    getOutput(
        instanceId: string,
        slotId: string
    ){
        return this.inputElements.get(
            this.slotKey(instanceId,slotId)
        );
    }

}
