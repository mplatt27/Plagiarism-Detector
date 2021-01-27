import { describe } from 'mocha';
import {expect} from 'chai'
import Match from '../detector/Match';
import MaximalMatches from '../detector/MaximalMatches';
import { fail } from 'assert';

/**
 * Tests for the MaximalMatches class. 
 */
describe("Tests for MaximalMatch class", () => {
    it("Test can find() Match add()-ed to MaximalMatch by input of Matches index1", () => {
        try {
            let m1 = new Match(0, 2, 5)
            let mm = new MaximalMatches()
            mm.add(m1)
            expect(mm.find(0).getStartIndex1()).to.equal(0)
            expect(mm.find(0).getStartIndex2()).to.equal(2)
            expect(mm.find(0).getLength()).to.equal(5)
        } catch (exception) {
            fail("Exception should NOT have been thrown")
        }
    })
    it("Test can find() Match add()-ed to MaximalMatch by input of Matches index2", () => {
        try {
            let m1 = new Match(0, 2, 5)
            let mm = new MaximalMatches()
            mm.add(m1)
            expect(mm.find(2).getStartIndex1()).to.equal(0)
            expect(mm.find(2).getStartIndex2()).to.equal(2)
            expect(mm.find(2).getLength()).to.equal(5)
        } catch (exception) {
            fail("Exception should NOT have been thrown")
        }
    })
    it("Test can add() multiple Matches of different lengths and find() them in MaximalMatches", () => {
        try {
            let m1 = new Match(0, 2, 5)
            let m2 = new Match(4, 8, 11)
            let m3 = new Match(1, 13, 1)
            let mm = new MaximalMatches()
            mm.add(m1)
            mm.add(m2)
            mm.add(m3)
            expect(mm.find(0).getStartIndex1()).to.equal(0)
            expect(mm.find(2).getStartIndex2()).to.equal(2)
            expect(mm.find(4).getStartIndex1()).to.equal(4)
            expect(mm.find(8).getStartIndex2()).to.equal(8)
            expect(mm.find(1).getStartIndex1()).to.equal(1)
            expect(mm.find(13).getStartIndex2()).to.equal(13)
        } catch (exception) {
            fail("Exception should NOT have been thrown")
        }
    })
    it("Test can add() multiple Matches of the same length and find() them in MaximalMatches", () => {
        try {
            let m1 = new Match(0, 2, 5)
            let m2 = new Match(4, 8, 5)
            let m3 = new Match(1, 13, 5)
            let mm = new MaximalMatches()
            mm.add(m1)
            mm.add(m2)
            mm.add(m3)
            expect(mm.find(0).getStartIndex1()).to.equal(0)
            expect(mm.find(2).getStartIndex2()).to.equal(2)
            expect(mm.find(4).getStartIndex1()).to.equal(4)
            expect(mm.find(8).getStartIndex2()).to.equal(8)
            expect(mm.find(1).getStartIndex1()).to.equal(1)
            expect(mm.find(13).getStartIndex2()).to.equal(13)
        } catch (exception) {
            fail("Exception should NOT have been thrown")
        }
    })
    it("Test find() method returns undefined for empty MaximalMatches", () => {
        try {
            let mm = new MaximalMatches()
            expect(mm.find(4)).to.equal(undefined)
        } catch (exception) {
            fail("Exception should NOT have been thrown")
        }
    })
    it("Test find() method returns undefined for nonexistent Match in MaximalMatches", () => {
        try {
            let m1 = new Match(0, 4, 8)
            let mm = new MaximalMatches()
            mm.add(m1)
            expect(mm.find(11)).to.equal(undefined)
        } catch (exception) {
            fail("Exception should NOT have been thrown")
        }
    })
    it("Test can remove() a Match from MaximalMatches leaving other Matches of different lengths unchanged", () => {
        try {
            let m1 = new Match(0, 2, 5)
            let m2 = new Match(4, 8, 4)
            let m3 = new Match(1, 13, 3)
            let mm = new MaximalMatches()
            mm.add(m1)
            mm.add(m2)
            mm.add(m3)
            expect(mm.find(0).getStartIndex1()).to.equal(0)
            expect(mm.find(2).getStartIndex2()).to.equal(2)
            expect(mm.remove(m1)).to.equal(1)
            expect(mm.find(0)).to.equal(undefined)
            expect(mm.find(2)).to.equal(undefined)   
        } catch (exception) {
            fail("Exception should NOT have been thrown")
        }
    })
    it("Test can remove() a Match from MaximalMatches leaving other Matches of same length unchanged", () => {
        try {
            let m1 = new Match(0, 2, 5)
            let m2 = new Match(4, 8, 5)
            let m3 = new Match(1, 13, 5)
            let mm = new MaximalMatches()
            mm.add(m1)
            mm.add(m2)
            mm.add(m3)
            expect(mm.remove(m1)).to.equal(1)
            expect(mm.find(0)).to.equal(undefined)
            expect(mm.find(2)).to.equal(undefined) 
            expect(mm.find(4).getStartIndex1()).to.equal(4)
            expect(mm.find(8).getStartIndex2()).to.equal(8)
            expect(mm.find(1).getStartIndex1()).to.equal(1)
            expect(mm.find(13).getStartIndex2()).to.equal(13)   
        } catch (exception) {
            fail("Exception should NOT have been thrown")
        }
    })
    it("Test attempting to remove() a nonexistent Match from MaximalMatches returns -1", () => {
        try {
            let m1 = new Match(0, 2, 5)
            let m2 = new Match(4, 8, 5)
            let m3 = new Match(1, 13, 5)
            let mm = new MaximalMatches()
            mm.add(m1)
            mm.add(m2)
            mm.add(m3)
            expect(mm.remove(new Match(10, 10, 9))).to.equal(-1)
        } catch (exception) {
            fail("Exception should NOT have been thrown")
        }    
    })
    it("Test attempting to remove() a nonexistent Match from an empty MaximalMatches return -1", () => {
        try {
            let mm = new MaximalMatches()
            expect(mm.remove(new Match(10, 10, 9))).to.equal(-1)
        } catch (exception) {
            fail("Exception should NOT have been thrown")
        }
    })
    it("Catch exception for attempting to add() an undefined Match", () => {
        try {
            let mm = new MaximalMatches()
            mm.add(undefined)
            fail("Exception should have been thrown")
        } catch (exception) {
            // Exception should be thrown
        }
    })
    it("Catch exception for attempting to remove() an undefined Match", () => {
        try {
            let mm = new MaximalMatches()
            mm.add(new Match(1, 4, 2))
            mm.remove(undefined)
            fail("Exception should have been thrown")
        } catch (exception) {
            // Exception should be thrown
        }
    })
    it("Catch exception for attempting to find() an undefined Match", () => {
        try {
            let mm = new MaximalMatches()
            mm.find(undefined)
            fail("Exception should have been thrown")
        } catch (exception) {
            // Exception should be thrown
        }
    })
})