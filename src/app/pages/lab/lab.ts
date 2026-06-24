import { Component, OnInit, ViewChild } from '@angular/core';
import { BlockPalette } from "../../ui/app-ui/block-palette/block-palette";
import { EditorControllerService } from '../../services/editor-controller-service';
import { GraphService } from '../../services/graph-service';
import { Canvas } from '../../ui/app-ui/canvas/canvas';

@Component({
  selector: 'app-lab',
  imports: [Canvas, BlockPalette],
  templateUrl: './lab.html',
  styleUrl: './lab.scss',
})
export class Lab implements OnInit{
    
    constructor(public graphService: GraphService, public editorControllerService: EditorControllerService){
    }

    @ViewChild('canvas')
    canvas!: Canvas;

    ngOnInit() {
        // this.runTests();
    }

    spawnThreeInstances(){
        const first = this.graphService.addInstance("text",{
            position: {
                x: 0,
                y: 0
            }
        })

        const second = this.graphService.addInstance("text",{
            position: {
                x: 1000,
                y: 1000
            }
        })

        const third = this.graphService.addInstance("text",{
            position: {
                x: 2000,
                y: 2000
            }
        })
    }
    
    // Stress Testing Function

    stressTest(){
        const mainInstance = this.graphService.addInstance("text",{
            position: {
                x: 0,
                y: 0
            }
        });

        for(let i = 0; i < 300; i++){
            const otherinstance = this.graphService.addInstance("concat")
            this.graphService.addWire(mainInstance, "out", otherinstance, "text")
        }
    }

    stressTestSpread(){
        for(let i = 0; i < 300; i++) {
            this.graphService.addInstance("concat", {
                position: {
                    x: (i % 20) * 200,
                    y: Math.floor(i / 20) * 100
                }
            });
        }
    }

    stressTestSpreadWithWires(){
        const mainInstance = this.graphService.addInstance("text",{
            position: {
                x: 0,
                y: 0
            }
        });

        for(let i = 0; i < 300; i++) {
            const otherInstance = this.graphService.addInstance("concat", {
                position: {
                    x: (i % 20) * 200,
                    y: Math.floor(i / 20) * 100
                }
            });
            this.graphService.addWire(mainInstance, "out", otherInstance, "text")
        }
    }

    /**
     *  Test Functions
     */

    runTests() {
        try {
            this.test();
            this.test2();
            this.testBranching();
            this.testDiamond();
            this.testParamFallback();
            this.testWireOverridesParam();
            this.testMultiOutputBasic();
            this.testMultiOutputDiamond();
            this.testUnusedOutputIgnored();
            this.testFindReplaceMixed();
            this.testStringCoercion();
            this.testBooleanCoercion();
            this.testDefaultParams();
            this.testTypeMismatch();
            this.testMissingOutput();
            console.log("✅ All tests passed");
        } catch (e) {
            console.error("❌ Test failed:", e);
        }
    }

    test(){
        
        const a = this.graphService.addInstance("text", { 
            params: { value: "hello world" }
        });
        const b = this.graphService.addInstance("uppercase");

        this.graphService.addWire(a, "out", b, "text");

        console.log("Test 1:",this.graphService.run(b)); // HELLO WORLD
    }

    test2() {
        const a = this.graphService.addInstance("text", { 
            params: { value: "TeSt" }
        });
        const b = this.graphService.addInstance("uppercase");
        const c = this.graphService.addInstance("reverse");

        this.graphService.addWire(a, "out", b, "text");
        this.graphService.addWire(b, "out", c, "text");

        console.log("Test 2:",this.graphService.run(c)); // TSET
    }

    testBranching() {
        const a = this.graphService.addInstance("text", {
             params: { value: "TeSt" }
            });
        const b = this.graphService.addInstance("uppercase");
        const c = this.graphService.addInstance("lowercase");

        this.graphService.addWire(a, "out", b, "text");
        this.graphService.addWire(a, "out", c, "text");

        console.log("Test Branching (Result 1):",this.graphService.run(b)); // TEST
        console.log("Test Branching (Result 2):",this.graphService.run(c)); // test
    }

    testDiamond() {
        const a = this.graphService.addInstance("text", { 
            params: {value: "TeSt" }
        });
        const b = this.graphService.addInstance("uppercase");
        const c = this.graphService.addInstance("lowercase");
        const d = this.graphService.addInstance("concat", { 
            params: {separator: " + "}
        });

        this.graphService.addWire(a, "out", b, "text");
        this.graphService.addWire(a, "out", c, "text");

        this.graphService.addWire(b, "out", d, "text");
        this.graphService.addWire(c, "out", d, "text2");

        console.log("Diamond Result:",this.graphService.run(d));
    }

    testParamFallback() {
        const a = this.graphService.addInstance("text", { 
            params: { value: "hello" }
        });
        const b = this.graphService.addInstance("text", {
            params: { value: "world" }
        });
        const c = this.graphService.addInstance("concat", {
            params: { separator: " " }
        });

        this.graphService.addWire(a, "out", c, "text");
        this.graphService.addWire(b, "out", c, "text2");

        const result = this.graphService.run(c);

        console.log("Param fallback:", result);
    }

    testWireOverridesParam() {
        const a = this.graphService.addInstance("text", { 
            params: { value: "hello" }
        });
        const b = this.graphService.addInstance("text", { 
            params: { value: "world" }
        });

        const sepNode = this.graphService.addInstance("text", {
            params: { value: "-" }
        });

        const c = this.graphService.addInstance("concat", {
            params: { separator: " " } // should be ignored
        });

        this.graphService.addWire(a, "out", c, "text");
        this.graphService.addWire(b, "out", c, "text2");

        const result = this.graphService.run(c);

        console.log("Wire override:", result);
    }

    testMultiOutputBasic() {
        const a = this.graphService.addInstance("text", { 
            params: { value: "TeSt" }
        });

        const split = this.graphService.addInstance("splitCase");

        const upper = this.graphService.addInstance("uppercase");
        const lower = this.graphService.addInstance("lowercase");

        // feed input
        this.graphService.addWire(a, "out", split, "text");

        // IMPORTANT: selecting different outputs
        this.graphService.addWire(split, "upper", upper, "text");
        this.graphService.addWire(split, "lower", lower, "text");

        console.log("Upper path:", this.graphService.run(upper)); // TEST
        console.log("Lower path:", this.graphService.run(lower)); // test

        console.log("splitCase:", this.graphService.run(split)) // Prints both at once
    }

    testMultiOutputDiamond() {
        const a = this.graphService.addInstance("text", { 
            params: { value: "TeSt" }
        });
        const split = this.graphService.addInstance("splitCase");

        const concat = this.graphService.addInstance("concat", {
            params: { separator: " | " }
        });

        this.graphService.addWire(a, "out", split, "text");

        // split outputs go to different transformations
        const upper = this.graphService.addInstance("uppercase");
        const lower = this.graphService.addInstance("lowercase");

        this.graphService.addWire(split, "upper", upper, "text");
        this.graphService.addWire(split, "lower", lower, "text");

        // converge
        this.graphService.addWire(upper, "out", concat, "text");
        this.graphService.addWire(lower, "out", concat, "text2");

        const result = this.graphService.run(concat);

        console.log("Multi-output diamond:", result);
    }

    testUnusedOutputIgnored() {
        const t = this.graphService.addInstance("text", {
            params: { value: "water" }
        });

        const split = this.graphService.addInstance("splitCase");

        const upper = this.graphService.addInstance("uppercase");

        // wire input properly (THIS WAS MISSING)
        this.graphService.addWire(
            t,
            "out",
            split,
            "text"
        );

        // only use ONE output
        this.graphService.addWire(
            split,
            "upper",
            upper,
            "text"
        );

        const result = this.graphService.run(upper);

        console.log("Upper path:", result);

        console.assert(
            result.out === "WATER",
            "Expected WATER"
        );

        const result2 = this.graphService.run(split);

        console.log("Split raw output:", result2);

        console.assert(
            result2.upper === "WATER",
            "Expected upper output"
        );

        console.assert(
            result2.lower === "water",
            "Expected lower output"
        );

    }

    testFindReplaceMixed() {
        // source text
        const textNode = this.graphService.addInstance("text", {
            params: { value: "the cat sat on the cat" }
        });

        // replacement value comes from another node
        const replaceNode = this.graphService.addInstance("text", {
            params: { value: "dog" }
        });

        // find value is MANUAL PARAM
        const replaceBlock = this.graphService.addInstance("findReplace", {
            params: { find: "cat" }
        });

        // wire text input
        this.graphService.addWire(
            textNode,
            "out",
            replaceBlock,
            "text"
        );

        // wire replacement input
        this.graphService.addWire(
            replaceNode,
            "out",
            replaceBlock,
            "replace"
        );

        const result = this.graphService.run(replaceBlock);

        console.log("FindReplace Mixed:", result); //expected: the dog sat on the dog
    }

    testStringCoercion() {
        const a = this.graphService.addInstance("text", {
            params: { value: 12345 }
        });

        const result = this.graphService.run(a);

        console.log("String coercion:", result);

        console.assert(
            result.out === "12345",
            "Expected coerced string"
        );
    }

    testBooleanCoercion() {
        const a = this.graphService.addInstance(
            "booleanEcho",
            {
                params: { value: "hello" }
            }
        );

        const result = this.graphService.run(a);

        console.log("Boolean coercion:", result);

        console.assert(
            result.out === true,
            "Expected true"
        );
    }

    testDefaultParams() {
        const a = this.graphService.addInstance("text");

        const result = this.graphService.run(a);

        console.log("Default params:", result);

        console.assert(
            result.out === "",
            "Expected default empty string"
        );
    }

    testTypeMismatch() {
        const numberNode =
            this.graphService.addInstance(
                "number",
                { 
                    params: { value: 42 }
                }
            );

        const upper =
            this.graphService.addInstance(
                "uppercase"
            );

        try {

            this.graphService.addWire(
                numberNode,
                "out",
                upper,
                "text"
            );

            console.error(
                "Expected type mismatch"
            );

        } catch (e) {

            console.log(
                "Type mismatch passed:",
                e
            );
        }
    }

    testMissingOutput() {
        const a =
            this.graphService.addInstance(
                "text",
                { 
                    params: { value: "hello" }
                }
            );

        const b =
            this.graphService.addInstance(
                "uppercase"
            );

        try {

            this.graphService.addWire(
                a,
                "fakeOutput",
                b,
                "text"
            );

            this.graphService.run(b);

        } catch (e) {

            console.log(
                "Missing output test passed:",
                e
            );
        }
    }

}
