import { describe } from 'mocha'
import { expect } from 'chai'
import { fail } from 'assert'
import Project from '../detector/Project'

/**
 * Tests for the Project class.
 */

describe("Tests for Project class", () => {
    it("Create Project pro1 with .txt file Submission1.txt", () => {
        try {
            let pro1 = new Project(['Submission1.txt'])
            fail("Exception should have been thrown!")
        } catch (exception) {
            // pass
        }
    })
    it("Create Project pro2 with .txt file Submission2.txt", () => {
        try {
            let pro2 = new Project(['Submission2.txt'])
            fail("Exception should have been thrown!")
        } catch (exception) {
            // pass
        }
    })
    it("Create Project pro3 with .ts file Submission3.ts", () => {
        try {
            let pro3 = new Project(['./src/test_submissions/Submission3.ts'])
            expect(pro3.getAllSubmissionsAsSingleString()).to.equal("class MartianClass {"
                + "\n    public constructor(private name: string) {"
                + "\n    }"
                + "\n\n    public getName() {"
                + "\n        return this.name"
                + "\n    }"
                + "\n}")
        } catch (exception) {
            fail("Exception should NOT have been thrown!")
        }
    })
    it("Create Project pro4 with null input", () => {
        try {
            let pro4 = new Project([null]) 
            fail("Exception should have been thrown!")
        } catch (exception) {
            // pass
        }
    })
    it("Create Project pro5 with nonexistant .ts file", () => {
        try {
            let pro5 = new Project(["./noSuchFile.ts"]) 
            fail("Exception should have been thrown!")
        } catch (exception) {
            // pass
        }
    })
    it("Create Project pro6 with 2x .ts file Submission3.ts", () => {
        try {
            let pro6 = new Project(['./src/test_submissions/Submission3.ts', './src/test_submissions/Submission3.ts'])
            expect(pro6.getAllSubmissionsAsSingleString()).to.equal("class MartianClass {"
                + "\n    public constructor(private name: string) {"
                + "\n    }"
                + "\n\n    public getName() {"
                + "\n        return this.name"
                + "\n    }"
                + "\n}"
                + "class MartianClass {"
                + "\n    public constructor(private name: string) {"
                + "\n    }"
                + "\n\n    public getName() {"
                + "\n        return this.name"
                + "\n    }"
                + "\n}")
        } catch (exception) {
            fail("Exception should NOT have been thrown!")
        }
    })
    it("Create Project pro7 with 2x .ts file Submission3.ts (1x added via method)", () => {
        try {
            let pro7 = new Project(['./src/test_submissions/Submission3.ts'])
            expect(pro7.getAllSubmissionsAsSingleString()).to.equal("class MartianClass {"
                + "\n    public constructor(private name: string) {"
                + "\n    }"
                + "\n\n    public getName() {"
                + "\n        return this.name"
                + "\n    }"
                + "\n}")
            pro7.addSubmission('./src/test_submissions/Submission3.ts')
            expect(pro7.getAllSubmissionsAsSingleString()).to.equal("class MartianClass {"
                + "\n    public constructor(private name: string) {"
                + "\n    }"
                + "\n\n    public getName() {"
                + "\n        return this.name"
                + "\n    }"
                + "\n}"
                + "class MartianClass {"
                + "\n    public constructor(private name: string) {"
                + "\n    }"
                + "\n\n    public getName() {"
                + "\n        return this.name"
                + "\n    }"
                + "\n}")
        } catch (exception) {
            fail("Exception should NOT have been thrown!")
        }
    })
})