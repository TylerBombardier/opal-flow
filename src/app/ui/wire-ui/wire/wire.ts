import { Component, Input } from '@angular/core';
import { WireDrawContext } from '../types/wire-rendering';
import { LinearWireStrategy } from '../strategies/linear/linear-wire-strategy';

@Component({
  selector: 'app-wire',
  imports: [],
  templateUrl: './wire.html',
  styleUrl: './wire.scss',
})
export class Wire {

    @Input()
    context!: WireDrawContext

    private strategy = new LinearWireStrategy()

    get path(){
        return this.strategy.draw(this.context)
    }

}
