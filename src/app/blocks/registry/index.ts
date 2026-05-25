import { addBlock, booleanEchoBlock, concatBlock, findReplaceBlock, ifBlock, lowercaseBlock, multiplyBlock, numberBlock, reverseBlock, splitCaseBlock, textBlock, uppercaseBlock } from "../blocks";
import { BlockRegistry } from "./block-registry";

export const blockRegistry = new BlockRegistry();

export function registerBlocks(){
    blockRegistry.register(textBlock);
    blockRegistry.register(uppercaseBlock);
    blockRegistry.register(lowercaseBlock);
    blockRegistry.register(reverseBlock);
    blockRegistry.register(concatBlock);
    blockRegistry.register(splitCaseBlock);
    blockRegistry.register(findReplaceBlock);
    blockRegistry.register(booleanEchoBlock);
    blockRegistry.register(numberBlock);
    blockRegistry.register(addBlock);
    blockRegistry.register(multiplyBlock);
    blockRegistry.register(ifBlock);
}
