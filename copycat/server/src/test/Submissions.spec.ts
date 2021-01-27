import { describe } from 'mocha';
import {expect} from 'chai'
import Submission from '../detector/Submission';
import { fail } from 'assert';

/**
 * Tests for the Submission class.
 */

describe("Tests for Submission class", () => {
    it("Create Submission for submission1", () => {
        try {
            let sub1 = new Submission('./src/test_submissions/Submission1.txt')
            expect(sub1.getSubmission()).to.equal("const x = 10")
        } catch (exception) {
            fail("Exception should NOT have been thrown")
        }
    })
    it("Create Submission for submission2", () => {
        try {
            let sub2 = new Submission('./src/test_submissions/Submission2.txt')
            expect(sub2.getSubmission()).to.equal("Hi folks my name is Melanie and I come from NH.")
        } catch (exception) {
            fail("Exception should NOT have been thrown")
        }
    })
    it("Create Submission for a ts file", () => {
        try {
            let sub3 = new Submission('./src/test_submissions/Submission3.ts')
            expect(sub3.getSubmission()).to.deep.equal("class MartianClass {"
                + "\n    public constructor(private name: string) {"
                + "\n    }"
                + "\n\n    public getName() {"
                + "\n        return this.name"
                + "\n    }"
                + "\n}")
        } catch(exception) {
            fail("Exception should NOT have been thrown")
        }        
    })
    it("Catch null value given to constructor", () => {
        try {
            let sub = new Submission(null) 
            fail("Exception should have been thrown")
        } catch (exception) {
            // Exception should be thrown.
        }
    })   
    it("Catch empty string given to constructor", () => {
        try {
            let sub = new Submission("") 
            fail("Exception should have been thrown")
        } catch (exception) {
            // Exception should be thrown.
        }
    }) 
    it("Catch nonexistent file name into constructor", () => {
        try {
            let sub = new Submission("./Ravenclaw.ts") 
            fail("Exception should have been thrown")
        } catch (exception) {
            // Exception should be thrown.
        }
    })     
})