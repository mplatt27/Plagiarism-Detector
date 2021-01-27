"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
describe("tests for Submission class", () => {
    it("make submission", () => {
        //const blob = new Blob([data as BlobPart],    
        //let buff = new SourceBuffer    
        //let fileInput = document.querySelector('Submission1File.txt')
        //let fil = new File(fileInput, 'Submission1File.txt')
        //var file = fileInput.files.item(0);
        //var reader = new FileReader();
        //console.log(reader.readAsBinaryString.toString())
        //console.log("hi")
        var reader = new FileReader();
        reader.onload = function (e) {
            var text = reader.result;
        };
        reader.readAsText(new Blob);
    });
});
//# sourceMappingURL=tests.spec.js.map