import { fail } from "assert"
import { expect } from "chai"
import PlagBuilder from "../detector/PlagBuilder"
import Project from "../detector/Project"
import { assert } from "chai"
import Parser from "../detector/Parser"

/**
 * Tests for the PlagBuilder class. 
 */

describe("Tests for PlagfBuilder class", () => {
    it("Check that the initial search length and min search lenght is correct when building detector", () => {
        let builder = new PlagBuilder([['./src/test_submissions/Submission1MP.ts', './src/test_submissions/Submission2MP.ts'], ['./src/test_submissions/Submission3MP.ts']]) 
        let pd = builder.getPlagiarismDetector()
        expect(pd.getInitialSearchLength()).to.equal(39)
        expect(pd.getMinimalMatchLength()).to.equal(40)

    })
    it("Check that there are the correct number of projects, parsers, and token managers when building detector", () => {
        let builder = new PlagBuilder([['./src/test_submissions/Submission1MP.ts', './src/test_submissions/Submission2MP.ts'], ['./src/test_submissions/Submission3MP.ts']]) 
        expect(builder.getProjects().length).to.equal(2)
        expect(builder.getParsers().length).to.equal(2)
        expect(builder.getTokenManagers().length).to.equal(2)
    })
})

