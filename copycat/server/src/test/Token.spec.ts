import { describe } from 'mocha';
import {expect} from 'chai'
import Token from '../detector/Token';
import { fail } from 'assert';

describe("Tests for Token class", () => {
    it("Create new Token object", () => {
        try {
            let tok1 = new Token("x", "identifier", [0,0])
            expect(tok1.getOriginalText()).to.equal("x")
            expect(tok1.getTokenizedText()).to.equal("identifier")
            expect(tok1.isMarked()).to.equal(false)
            // GetTokenizedText()
        } catch (exception) {
            fail("Exception should NOT have been thrown")
        }
    })
    it("Check that Token isMarked() after being marked", () => {
        let tok1 = new Token("x", "identifier", [0,0])
        tok1.markToken()
        expect(tok1.isMarked()).to.equal(true)

    })
    it("Check that Token has the correct range with getRange()", () => {
        let tok1 = new Token("x", "identifier", [0,0])
        expect(tok1.getRange()).to.deep.equal([0,0])

    })
    it("Catch exception for attempting to create a Token will an undefined value", () => {
        try {
            let tok1 = new Token(undefined, undefined, [0,0])
            fail("Exception should have been thrown")
        } catch (exception) {
            // Exception should be thrown.
        }   
    })    
})    