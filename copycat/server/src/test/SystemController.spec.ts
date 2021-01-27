import SystemController from "../detector/SystemController"
import { expect } from "chai"

/**
 * Tests for the SystemController. 
 */

describe("Tests for SystemController class", () => {
    it("Controller creates an accurate PlagiarismDetector", () => {
        let controller = new SystemController([['./src/test_submissions/Submission1MP.ts', './src/test_submissions/Submission2MP.ts'], ['./src/test_submissions/Submission3MP.ts']])
        controller.runPlagiarismDetector()
        let detector = controller.getPlagiarismDetector()

        let t1Count = 0
        for (var i = 0; i < detector.getT1().getTokenizedList().length; i++){
            if (detector.getT1().getTokenizedList()[i].isMarked()){
                t1Count++
             }

        }
        expect(t1Count).to.equal(0)

        let t2Count = 0
        for (var i = 0; i < detector.getT2().getTokenizedList().length; i++){
            if (detector.getT2().getTokenizedList()[i].isMarked()){
                t2Count++
            }

        }
        expect(t2Count).to.equal(0)
    })
    it("Controller gets accurate getOutput()", () => {
        let controller = new SystemController([['./src/test_submissions/Submission1MP.ts', './src/test_submissions/Submission2MP.ts'], ['./src/test_submissions/Submission3MP.ts']])
        controller.runPlagiarismDetector()
        
        expect(controller.getOutput()).to.deep.equal([
          [
            '<pre>// this is test 1\n' +
              'let x = 10\n' +
              'if (x < 2) {\n' +
              '    console.log("hello world");\n' +
              '    \n' +
              '} else {\n' +
              '    for (let i = 0; i < 10; i++) {\n' +
              '        console.log(i);\n' +
              '        \n' +
              '    }\n' +
              '}</pre><pre>class Dog {\n' +
              '    constructor(private name : string){\n' +
              '        console.log("woof");\n' +
              '        \n' +
              '    }\n' +
              '\n' +
              '    public getName() : string {\n' +
              '        return this.name\n' +
              '    }\n' +
              '}</pre'
          ],
          [
            '<pre>// this file should have one function in common with the file we are checking it against\n' +
              'export function foo(x : number) : void{\n' +
              '    if (x == 10) {\n' +
              '        console.log("yay!");\n' +
              '        \n' +
              '    } else {\n' +
              "        let myList = ['hello', 'world', 'yay']\n" +
              '        myList.forEach(element => {\n' +
              "            element = element + 'extra'\n" +
              '        });\n' +
              '    }\n' +
              '}\n' +
              '\n' +
              'export function foo2() : void{\n' +
              '    let y = 0\n' +
              '    while(y < 5) {\n' +
              '        y++ \n' +
              '    }\n' +
              '}</pre'
          ]
        ])
        
    })

})