import TokenManager from "../detector/TokenManager"
import Token from "../detector/Token"
import { fail } from "assert"
import { expect } from "chai"
import Project from "../detector/Project"

/**
 * Tests for the TokenManger class.
 */
describe("Tests for TokenManager class", () => { // for these tests (this one and all the ones below it), the project doesn't matter (taken from the previous test)
    it("Create new TokenManager object", () => {
        try {
            let tm = new TokenManager([new Token("x", "identifier", [0,0]), new Token("y", "identifier", [0,0]), 
            new Token("z", "identifier", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))
        } catch (exception) {
            fail("Exception should NOT have been thrown")
        }
    })
    it("Catch exception for attempting to create a new TokenManager with an undefined input", () => {
        try {
            let tm = new TokenManager(undefined, new Project(['./src/test_submissions/Submission4.ts']))
            fail("Exception should have been thrown")
        } catch (exception) {
            // Exception should be thrown
        }
    })
    it("Test getTokenizedList() method on TokenManager", () => {
        try {
            let vampire = new Token("x", "identifier", [0,0])
            let ghost = new Token("y", "identifier", [0,0])
            let werewolf = new Token("z", "identifier", [0,0])
            let list = [vampire, ghost, werewolf]
            let tm = new TokenManager(list, new Project(['./src/test_submissions/Submission4.ts']))
            expect(tm.getTokenizedList()).to.equal(list)
        } catch (exception) {
            fail("Exception should NOT have been thrown")
        }
    })
    it("Test getTokenizedString() method on TokenManager for full list of tokens", () => {
        try {
            let vampire = new Token("x", "identifier", [0,0])
            let ghost = new Token("y", "identifier", [0,0])
            let werewolf = new Token("z", "identifier", [0,0])
            let list = [vampire, ghost, werewolf]
            let tm = new TokenManager(list, new Project(['./src/test_submissions/Submission4.ts']))
            expect(tm.getTokenizedString(0, 2)).to.equal("identifieridentifieridentifier")
        } catch (exception) {
            fail("Exception should NOT have been thrown")
        }
    })
    it("Test getTokenizedString() method on TokenManager for one token", () => {
        try {
            let vampire = new Token("x", "identifier", [0,0])
            let ghost = new Token("y", "identifier", [0,0])
            let werewolf = new Token("z", "identifier", [0,0])
            let list = [vampire, ghost, werewolf]
            let tm = new TokenManager(list, new Project(['./src/test_submissions/Submission4.ts']))
            expect(tm.getTokenizedString(1, 1)).to.equal("identifier")
        } catch (exception) {
            fail("Exception should NOT have been thrown")
        }
    })
    it("Test getTokenizedString() method on TokenManager for substring of tokens", () => {
        try {
            let vampire = new Token("x", "identifier", [0,0])
            let ghost = new Token("y", "identifier", [0,0])
            let werewolf = new Token("z", "identifier", [0,0])
            let list = [vampire, ghost, werewolf]
            let tm = new TokenManager(list, new Project(['./src/test_submissions/Submission4.ts']))
            expect(tm.getTokenizedString(1, 2)).to.equal("identifieridentifier")
        } catch (exception) {
            fail("Exception should NOT have been thrown")
        }
    })
    it("Catch exception for getTokenizedString() method on TokenManager with undefined startIndex input", () => {
        try {
            let vampire = new Token("x", "identifier", [0,0])
            let ghost = new Token("y", "identifier", [0,0])
            let werewolf = new Token("z", "identifier", [0,0])
            let list = [vampire, ghost, werewolf]
            let tm = new TokenManager(list, new Project(['./src/test_submissions/Submission4.ts']))
            expect(tm.getTokenizedString(undefined, 1)).to.equal("identifier")
            fail("Exception should have been thrown")
        } catch (exception) {
            // Exception should be thrown
        }
    })
    it("Catch exception for getTokenizedString() method on TokenManager with undefined endIndex input", () => {
        try {
            let vampire = new Token("x", "identifier", [0,0])
            let ghost = new Token("y", "identifier", [0,0])
            let werewolf = new Token("z", "identifier", [0,0])
            let list = [vampire, ghost, werewolf]
            let tm = new TokenManager(list, new Project(['./src/test_submissions/Submission4.ts']))
            expect(tm.getTokenizedString(1, undefined)).to.equal("identifier")
            fail("Exception should have been thrown")
        } catch (exception) {
            // Exception should be thrown
        }
    })
    it("Catch exception for getTokenizedString() method on TokenManager with undefined startIndex and endIndex input", () => {
        try {
            let vampire = new Token("x", "identifier", [0,0])
            let ghost = new Token("y", "identifier", [0,0])
            let werewolf = new Token("z", "identifier", [0,0])
            let list = [vampire, ghost, werewolf]
            let tm = new TokenManager(list, new Project(['./src/test_submissions/Submission4.ts']))
            expect(tm.getTokenizedString(undefined, undefined)).to.equal("identifier")
            fail("Exception should have been thrown")
        } catch (exception) {
            // Exception should be thrown
        }
    })
})    