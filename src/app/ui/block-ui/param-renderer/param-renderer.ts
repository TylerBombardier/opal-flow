import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Instance } from '../../../graph/types';
import { Input } from '@angular/core';
import { ParamSlot } from '../../../blocks/types';
import { compRegistry } from '../component-registry';

@Component({
  selector: 'app-param-renderer',
  imports: [],
  templateUrl: './param-renderer.html',
  styleUrl: './param-renderer.scss',
})
export class ParamRenderer implements AfterViewInit{
    @Input() instance!: Instance
    @Input() param!: ParamSlot

    @ViewChild('container', {
        read: ViewContainerRef,
        static: true
    })
    container!: ViewContainerRef

    ngAfterViewInit(): void {
        const component = compRegistry.get(this.param.ui.type);

        if(!component){
            throw new Error(`No component registered for type: ${this.param.ui.type}`)
        }

        const ref = this.container.createComponent(component);
        ref.instance.instance = this.instance
        ref.instance.param = this.param
    }
}
