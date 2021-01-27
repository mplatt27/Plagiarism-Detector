"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const Submission_1 = require("./Submission");
const chai_1 = require("chai");
mocha_1.describe("tests for Submission class", () => {
    it("make submission for submission1", () => {
        let sub1 = new Submission_1.default('./Submission1.txt');
        chai_1.expect(sub1.getSubmission()).to.equal("Hello world my name is Melanie and I live in NH.");
    });
    it("make submission for submission2", () => {
        let sub2 = new Submission_1.default('./Submission2.txt');
        chai_1.expect(sub2.getSubmission()).to.equal("Hi folks my name is Melanie and I come from NH.");
    });
    it("make submission for a ts file", () => {
        let sub3 = new Submission_1.default('./Submission3.ts');
        chai_1.expect(sub3.getSubmission()).to.equal("class MartianClass { // Represents a martian with a name."
            + "\n    private name : string; // Name of the Martian."
            + "\n\n    public constructor(name: string) { // Construct a MartianClass"
            + "\n        this.name = name;"
            + "\n    }"
            + "\n\n    public getName() { // Helper to get name. Returns a string."
            + "\n        return this.name"
            + "\n    }"
            + "\n}");
    });
});
//# sourceMappingURL=index.spec.js.map