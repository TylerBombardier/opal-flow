import { Component, Input } from '@angular/core';
import { Instance } from '../../graph/types';

@Component({
  selector: 'app-block-instance',
  imports: [],
  templateUrl: './block-instance.html',
  styleUrl: './block-instance.scss',
})
export class BlockInstance {
    @Input()
    instance!: Instance
}
