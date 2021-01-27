import Parser from "../detector/Parser"
import Submission from "../detector/Submission"
import { expect } from "chai"
import Project from "../detector/Project"

/**
 * Tests for the Parser class. 
 */
describe("Tests for Parser class", () => {

    it("test parser that it returns the correct tokenManager with tokens holding correct originalText and TokenizedText, submission has no comments", () => {
       let pro1 = new Project(['./src/test_submissions/Submission3.ts'])
       let pars1 = new Parser(pro1)
   
       expect(pars1.getTokenManager().getTokenizedList()[0].getOriginalText()).to.equal("class")
       expect(pars1.getTokenManager().getTokenizedList()[1].getOriginalText()).to.equal("MartianClass")
       expect(pars1.getTokenManager().getTokenizedList()[2].getOriginalText()).to.equal("{")
       expect(pars1.getTokenManager().getTokenizedList()[3].getOriginalText()).to.equal("public")
       expect(pars1.getTokenManager().getTokenizedList()[23].getOriginalText()).to.equal("}")
       expect(pars1.getTokenManager().getTokenizedList()[22].getOriginalText()).to.equal("}")
       expect(pars1.getTokenManager().getTokenizedList()[21].getTokenizedText()).to.equal("Identifier")
       expect(pars1.getTokenManager().getTokenizedList()[20].getTokenizedText()).to.equal("Punctuator")
       expect(pars1.getTokenManager().getTokenizedList()[19].getTokenizedText()).to.equal("Keyword")
   
    }) 
   
    it("test parser that it returns the correct tokenManager with tokens holding correct originalText and TokenizedText, submission has comments", () => {
       let pro1 = new Project(['./src/test_submissions/Submission3withComments.ts'])
       let pars1 = new Parser(pro1)
      
       expect(pars1.getTokenManager().getTokenizedList()[0].getOriginalText()).to.equal("class")
       expect(pars1.getTokenManager().getTokenizedList()[1].getOriginalText()).to.equal("MartianClass1")
       expect(pars1.getTokenManager().getTokenizedList()[2].getOriginalText()).to.equal("{")
       expect(pars1.getTokenManager().getTokenizedList()[3].getOriginalText()).to.equal("public")
     
       expect(pars1.getTokenManager().getTokenizedList()[23].getOriginalText()).to.equal("}")
       expect(pars1.getTokenManager().getTokenizedList()[22].getOriginalText()).to.equal("}")
       expect(pars1.getTokenManager().getTokenizedList()[21].getTokenizedText()).to.equal("Identifier")
       expect(pars1.getTokenManager().getTokenizedList()[20].getTokenizedText()).to.equal("Punctuator")
       expect(pars1.getTokenManager().getTokenizedList()[19].getTokenizedText()).to.equal("Keyword")
    }) 
   })