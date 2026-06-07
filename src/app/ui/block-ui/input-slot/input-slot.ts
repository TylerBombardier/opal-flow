import { AfterViewInit, Component, ElementRef, Input, OnDestroy } from '@angular/core';
import { ElementRegistryService } from '../../../services/element-registry-service';
import { EditorStateService } from '../../../services/editor-state-service';

@Component({
  selector: 'app-input-slot',
  imports: [],
  templateUrl: './input-slot.html',
  styleUrl: './input-slot.scss',
})
export class InputSlot implements AfterViewInit, OnDestroy{

    constructor(
        private elementRef: ElementRef<HTMLElement>,
        private elementRegistry: ElementRegistryService,
        private editorState: EditorStateService
    ){}

    @Input()
    instanceId!: string

    @Input()
    inputId!: string

    ngAfterViewInit(): void {
        this.elementRegistry.registerInput(
            this.instanceId,
            this.inputId,
            this.elementRef.nativeElement
        )
    }

    ngOnDestroy(): void {
        this.elementRegistry.unregisterInput(
            this.instanceId,
            this.inputId
        )
    }

    onPointerEnter(event: PointerEvent){
        this.editorState.setHoveredInput(this.instanceId, this.inputId)
    }

    onPointerLeave(event: PointerEvent){
        this.editorState.clearHoveredInput()
    }
}
