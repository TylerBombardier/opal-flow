import { AfterViewInit, Component, ElementRef, Input, OnDestroy } from '@angular/core';
import { ElementRegistryService } from '../../../services/element-registry-service';

@Component({
  selector: 'app-input-slot',
  imports: [],
  templateUrl: './input-slot.html',
  styleUrl: './input-slot.scss',
})
export class InputSlot implements AfterViewInit, OnDestroy{

    constructor(
        private elementRef: ElementRef<HTMLElement>,
        private elementRegistry: ElementRegistryService
    ){}

    @Input()
    instanceId!: string

    @Input()
    input!: string

    ngAfterViewInit(): void {
        this.elementRegistry.registerInput(
            this.instanceId,
            this.input,
            this.elementRef.nativeElement
        )
    }

    ngOnDestroy(): void {
        this.elementRegistry.unregisterInput(
            this.instanceId,
            this.input
        )
    }
}
