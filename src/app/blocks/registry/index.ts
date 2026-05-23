import { addBlock, booleanEchoBlock, concatBlock, findReplaceBlock, ifBlock, lowercaseBlock, multiplyBlock, numberBlock, reverseBlock, splitCaseBlock, textBlock, uppercaseBlock } from "../blocks";
import { BlockRegistry } from "./block-registry";

export const registry = new BlockRegistry();

export function registerBlocks(){
    registry.register(textBlock);
    registry.register(uppercaseBlock);
    registry.register(lowercaseBlock);
    registry.register(reverseBlock);
    registry.register(concatBlock);
    registry.register(splitCaseBlock);
    registry.register(findReplaceBlock);
    registry.register(booleanEchoBlock);
    registry.register(numberBlock);
    registry.register(addBlock);
    registry.register(multiplyBlock);
    registry.register(ifBlock);
}
