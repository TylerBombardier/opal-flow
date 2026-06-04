import { Component, ElementRef, Input } from '@angular/core';
import { ElementRegistryService } from '../../../services/element-registry-service';
import { ValueSlot } from '../../../blocks/types';
import { EditorControllerService } from '../../../services/editor-controller-service';

@Component({
  selector: 'app-output-slot',
  imports: [],
  templateUrl: './output-slot.html',
  styleUrl: './output-slot.scss',
})
export class OutputSlot {

    constructor(
        private elementRef: ElementRef<HTMLElement>,
        private elementRegistry: ElementRegistryService,
        private editorController: EditorControllerService
    ){}

    @Input()
    instanceId!: string

    @Input()
    outputId!: string

    ngAfterViewInit(): void {
        this.elementRegistry.registerOutput(
            this.instanceId,
            this.outputId,
            this.elementRef.nativeElement
        )
    }

    ngOnDestroy(): void {
        this.elementRegistry.unregisterOutput(
            this.instanceId,
            this.outputId
        )
    }

    onPointerDown(event: PointerEvent){
        this.editorController.startDragWire(
            event,
            this.instanceId,
            this.outputId
        )
    }
}
