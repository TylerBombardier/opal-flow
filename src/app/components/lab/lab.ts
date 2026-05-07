import { Component } from '@angular/core';
import { GraphService } from '../../services/graph-service';

@Component({
  selector: 'app-lab',
  imports: [],
  templateUrl: './lab.html',
  styleUrl: './lab.scss',
})
export class Lab {
    
    constructor(private graphService: GraphService){
    }

    // Test functions

    runTests() {
        try {
            this.test();
            this.test2();
            this.testBranching();
            this.testDiamond();
            // this.testDiamond2(); purposeful error to test incorrect input wiring
            this.testParamFallback();
            this.testWireOverridesParam();
            this.testMultiOutputBasic();
            this.testMultiOutputDiamond();
            this.testUnusedOutputIgnored();
            console.log("✅ All tests passed");
        } catch (e) {
            console.error("❌ Test failed:", e);
        }
    }

    test(){
        
        const a = this.graphService.addInstance("text", { value: "hello world" });
        const b = this.graphService.addInstance("uppercase");

        this.graphService.addWire(a, "out", b, "text");

        console.log("Test 1:",this.graphService.run(b)); // HELLO WORLD
    }

    test2() {
        const a = this.graphService.addInstance("text", { value: "TeSt" });
        const b = this.graphService.addInstance("uppercase");
        const c = this.graphService.addInstance("reverse");

        this.graphService.addWire(a, "out", b, "text");
        this.graphService.addWire(b, "out", c, "text");

        console.log("Test 2:",this.graphService.run(c)); // TSET
    }

    testBranching() {
        const a = this.graphService.addInstance("text", { value: "TeSt" });
        const b = this.graphService.addInstance("uppercase");
        const c = this.graphService.addInstance("lowercase");

        this.graphService.addWire(a, "out", b, "text");
        this.graphService.addWire(a, "out", c, "text");

        console.log("Test Branching (Result 1):",this.graphService.run(b)); // TEST
        console.log("Test Branching (Result 2):",this.graphService.run(c)); // test
    }

    testDiamond() {
        const a = this.graphService.addInstance("text", { value: "TeSt" });
        const b = this.graphService.addInstance("uppercase");
        const c = this.graphService.addInstance("lowercase");
        const d = this.graphService.addInstance("concat", { separator: " + " });

        this.graphService.addWire(a, "out", b, "text");
        this.graphService.addWire(a, "out", c, "text");

        this.graphService.addWire(b, "out", d, "text");
        this.graphService.addWire(c, "out", d, "text2");

        console.log("Diamond Result:",this.graphService.run(d));
    }

    testDiamond2() {
        const a = this.graphService.addInstance("text", { value: "TeSt" });
        const b = this.graphService.addInstance("uppercase");
        const c = this.graphService.addInstance("lowercase");
        const d = this.graphService.addInstance("concat", { separator: " + " });

        this.graphService.addWire(a, "out", b, "text");
        this.graphService.addWire(a, "out", c, "text");

        this.graphService.addWire(b, "out", d, "a");
        this.graphService.addWire(c, "out", d, "b");

        const result = this.graphService.run(d);

        console.log("Diamond2 result:", result);
        console.assert(result === "TEST + test", "Expected 'TEST + test'");
    }

    testParamFallback() {
        const a = this.graphService.addInstance("text", { value: "hello" });
        const b = this.graphService.addInstance("text", { value: "world" });

        const c = this.graphService.addInstance("concat", {
            separator: " "
        });

        this.graphService.addWire(a, "out", c, "text");
        this.graphService.addWire(b, "out", c, "text2");

        const result = this.graphService.run(c);

        console.log("Param fallback:", result);
    }

    testWireOverridesParam() {
        const a = this.graphService.addInstance("text", { value: "hello" });
        const b = this.graphService.addInstance("text", { value: "world" });

        const sepNode = this.graphService.addInstance("text", {
            value: "-"
        });

        const c = this.graphService.addInstance("concat", {
            separator: " " // should be ignored
        });

        this.graphService.addWire(a, "out", c, "text");
        this.graphService.addWire(b, "out", c, "text2");

        const result = this.graphService.run(c);

        console.log("Wire override:", result);
    }

    testMultiOutputBasic() {
        const a = this.graphService.addInstance("text", { value: "TeSt" });

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
        const a = this.graphService.addInstance("text", { value: "TeSt" });
        const split = this.graphService.addInstance("splitCase");

        const concat = this.graphService.addInstance("concat", {
            separator: " | "
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
        const a = this.graphService.addInstance("splitCase");

        const b = this.graphService.addInstance("uppercase");

        // only use ONE output
        this.graphService.addWire(a, "upper", b, "text");

        const result = this.graphService.run(b);

        console.log("Unused output test:", result); // EXPECTED: out: ''

        const result2 = this.graphService.run(a);

        console.log("Unused output test:", result2); 
    }
}
