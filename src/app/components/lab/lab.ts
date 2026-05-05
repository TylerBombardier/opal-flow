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

    runTests() {
        try {
            this.test();
            this.test2();
            this.testBranching();
            this.testDiamond();
            this.testDiamond2();
            this.testParamFallback();
            this.testWireOverridesParam();
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

        console.log("Test Brancing (Result 1):",this.graphService.run(b)); // TEST
        console.log("Test Brancing (Result 2):",this.graphService.run(c)); // test
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

        this.graphService.addWire(b, "out", d, "text");
        this.graphService.addWire(c, "out", d, "text2");

        const result = this.graphService.run(d);

        console.log("Diamond2 result:", result);
        console.assert(result === "TEST + test", "Expected 'TEST + test'");
    }

    testParamFallback() {
        this.graphService.reset();

        const a = this.graphService.addInstance("text", { value: "hello" });
        const b = this.graphService.addInstance("text", { value: "world" });

        const c = this.graphService.addInstance("concat", {
            separator: " "
        });

        this.graphService.addWire(a, "out", c, "text");
        this.graphService.addWire(b, "out", c, "text2");

        const result = this.graphService.run(c);

        console.log("Param fallback:", result);
        console.assert(result === "hello world", "Expected 'hello world'");
    }

    testWireOverridesParam() {
        this.graphService.reset();

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
        this.graphService.addWire(sepNode, "out", c, "separator");

        const result = this.graphService.run(c);

        console.log("Wire override:", result);
        console.assert(result === "hello-world", "Expected 'hello-world'");
    }
}
