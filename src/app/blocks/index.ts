import { concatBlock, lowercaseBlock, reverseBlock, splitCaseBlock, textBlock, uppercaseBlock } from "./blocks";
import { BlockRegistry } from "./registry/block-registry";

export const registry = new BlockRegistry();

export function registerBlocks(){
    registry.register(textBlock);
    registry.register(uppercaseBlock);
    registry.register(lowercaseBlock);
    registry.register(reverseBlock);
    registry.register(concatBlock);
    registry.register(splitCaseBlock);
}
