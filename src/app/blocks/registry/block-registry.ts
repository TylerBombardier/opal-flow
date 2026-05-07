import { Block } from "../blocks";

export class BlockRegistry {
    private blocks = new Map<string, Block>();

    register(block: Block){
        if(this.blocks.has(block.id)){
            throw new Error(`Block already registed: ${block.id}`);
        }

        this.blocks.set(block.id, block)
    }

    get(id: string){
        const block = this.blocks.get(id);

        if(!block){
            throw new Error(`Block not found: ${id}`);
        }

        return block;
    }

    getAll(){
        return Array.from(this.blocks.values());
    }

    getMap(){
        return new Map(this.blocks);
    }

    clear(){
        this.blocks.clear();
    }
}
