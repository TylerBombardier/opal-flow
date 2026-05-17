import { Component, EventEmitter, Output } from '@angular/core';
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

    // Palette Events 
    @Output() spawn = new EventEmitter<string>();

    // Palette State Variables
    categoryOpen = new Set<string>();
    search = ""
    isOpen = true;

    // Toggles the block palette tray
    toggleTray(){
        this.isOpen = !this.isOpen
    }

    // Toggles a category inside the tray
    toggleCategory(key: string){
        if(this.categoryOpen.has(key)){
            this.categoryOpen.delete(key);
        } else {
            this.categoryOpen.add(key);
        }
    }

    // Checks if a category is open
    isCategoryOpen(key: string): boolean{
        return this.categoryOpen.has(key);
    }

    // Returns all currently registered blocks
    get blocks(){
        return this.graphService.getGraph().registry.getAll();
    }

    // Returns all blocks with the current filter for search
    get filteredBlocks() {
        return this.blocks.filter(block => {
            const text = (block.displayName ?? block.id).toLowerCase();

            return text.includes(
                this.search.toLowerCase()
            );
        });
    }

    // Returns blocks in their respective groups
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

    // Emits that a block was clicked
    onClick(blockId: string){
        console.log("Palette Clicked: "+blockId)
        this.spawn.emit(blockId);
    }
}
