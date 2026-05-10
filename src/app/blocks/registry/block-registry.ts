import { Block, BlockID } from "../types";


export class BlockRegistry {
    private blocks = new Map<string, Block>();

    register(block: Block){
        this.validateBlock(block)

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

    has(id: BlockID){
        return this.blocks.has(id)
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

    validateBlock(block: Block){
        const inputIds = new Set<string>();
        const outputIds = new Set<string>();
        const paramIds = new Set<string>();

        // Validate Inputs
        for (const i of block.inputs) {
            if (inputIds.has(i.id)) {
                throw new Error(`Duplicate input id ${i.id}`);
            }
            inputIds.add(i.id);
        }
        
        // Validate Outputs
        for (const o of block.outputs) {
            if (outputIds.has(o.id)) {
                throw new Error(`Duplicate output id ${o.id}`);
            }
            outputIds.add(o.id);
        }

        // Validate Parameters
        for (const p of block.params ?? []) {
            if (paramIds.has(p.id)) {
                throw new Error(`Duplicate parameter id ${p.id}`);
            }
            paramIds.add(p.id);
        }
    }
}
