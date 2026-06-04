import { Component, ElementRef, Input } from '@angular/core';
import { ElementRegistryService } from '../../../services/element-registry-service';

@Component({
  selector: 'app-output-slot',
  imports: [],
  templateUrl: './output-slot.html',
  styleUrl: './output-slot.scss',
})
export class OutputSlot {

    constructor(
        private elementRef: ElementRef<HTMLElement>,
        private elementRegistry: ElementRegistryService
    ){}

    @Input()
    instanceId!: string

    @Input()
    output!: string

    ngAfterViewInit(): void {
        this.elementRegistry.registerOutput(
            this.instanceId,
            this.output,
            this.elementRef.nativeElement
        )
    }

    ngOnDestroy(): void {
        this.elementRegistry.unregisterOutput(
            this.instanceId,
            this.output
        )
    }
}
