import { Component } from '@angular/core';
import { GraphService } from '../../services/graph-service';
import { FormsModule } from '@angular/forms';
import { KeyValuePipe } from '@angular/common'

@Component({
  selector: 'app-block-palette',
  imports: [FormsModule,KeyValuePipe],
  templateUrl: './block-palette.html',
  styleUrl: './block-palette.scss',
})
export class BlockPalette {
    constructor(public graphService: GraphService){}

    search = ""
    isOpen = true;

    toggle(){
        this.isOpen = !this.isOpen
    }

    get blocks(){
        return this.graphService.getGraph().registry.getAll();
    }

    get filteredBlocks() {
        return this.blocks.filter(block => {
            const text = (block.displayName ?? block.id).toLowerCase();

            return text.includes(
                this.search.toLowerCase()
            );
        });
    }

    get groupedBlocks() {
        const groups: Record<string, typeof this.filteredBlocks> = {};

        for (const block of this.filteredBlocks) {

            const category = block.category ?? "General";

            if (!groups[category]) {
                groups[category] = [];
            }

            groups[category].push(block);
        }

        return groups;
    }

    spawn(blockId: string){
        this.graphService.addInstance(blockId)
    }
}
