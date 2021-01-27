import { describe } from 'mocha';
import {expect} from 'chai'
import { fail } from 'assert';
import Match from '../detector/Match';

/**
 * Tests for the Match class. 
 */

describe("Tests for Match class", () => {
    it("Create and check methods on basic Match", () => {
        try {
            let match = new Match(2, 4, 2) 
            expect(match.getStartIndex1()).to.equal(2)
            expect(match.getStartIndex2()).to.equal(4)
            expect(match.getLength()).to.equal(2)
        } catch (exception) {
            fail("Exception should NOT have been thrown")
        }    

    })
    it("Catch constructor exception for null index1", () => {
        try {
            let match = new Match(null, 4, 3) 
            fail("Exception should have been thrown")
        } catch (exception) {
            // Exception should be thrown.
        }
    })
    it("Catch constructor exception for null index2", () => {
        try {
            let match = new Match(2, null, 3) 
            fail("Exception should have been thrown")
        } catch (exception) {
            // Exception should be thrown.
        }
    })
    it("Catch constructor exception for null length", () => {
        try {
            let match = new Match(2, 4, null) 
            fail("Exception should have been thrown")
        } catch (exception) {
            // Exception should be thrown.
        }
    })
    it("Catch constructor exception for negative index1", () => {
        try {
            let match = new Match(-2, 4, 4) 
            fail("Exception should have been thrown")
        } catch (exception) {
            // Exception should be thrown.
        }
    })
    it("Catch constructor exception for negative index2", () => {
        try {
            let match = new Match(2, -4, 6) 
            fail("Exception should have been thrown")
        } catch (exception) {
            // Exception should be thrown.
        }
    })
    it("Catch constructor exception for negative length", () => {
        try {
            let match = new Match(2, 4, -2) 
            fail("Exception should have been thrown")
        } catch (exception) {
            // Exception should be thrown.
        }
    })
    it("Catch constructor exception for length 0", () => {
        try {
            let match = new Match(1, 1, 0) 
            fail("Exception should have been thrown")
        } catch (exception) {
            // Exception should be thrown.
        }
    })
})
