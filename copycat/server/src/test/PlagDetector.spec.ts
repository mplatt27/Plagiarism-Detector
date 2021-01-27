import Submission from "../detector/Submission"
import Parser from "../detector/Parser"
import { expect } from "chai"
import PlagiarismDetector from "../detector/PlagiarismDetector"
import TokenManager from "../detector/TokenManager"
import Token from "../detector/Token"
import { fail } from "assert"
import Project from "../detector/Project"

/**
 * Tests for the PlagiarismDetector. The first set of tests are written to detect plagiarism in parsed code 
 * (Javascript/Typescript). The second set of test are written to detect plagiarism on English sentences, 
 * independent of the Parser. They were written prior to buildling our parser, but we believe they illustrate
 * the capabilities of the detector alone. 
 */

describe("Tests for PlagiarismDetector class", () => {

    it("Test where there are few similarities (under 15 tokens)", () => {
        let pro1 = new Project(['./src/test_submissions/Submission1MP.ts'])
        let pro2 = new Project(['./src/test_submissions/Submission2MP.ts'])
        let t1 = new Parser(pro1).getTokenManager()
        let t2 = new Parser(pro2).getTokenManager()
        let plag = new PlagiarismDetector(t1, t2, 15, 30)
        plag.rkr_gst()
        
        
       let t1Count = 0
       for (var i = 0; i < t1.getTokenizedList().length; i++){
           if (plag.getT1().getTokenizedList()[i].isMarked()){
               t1Count++
            }

       }

       let t2Count = 0
       for (var i = 0; i < t2.getTokenizedList().length; i++){
        if (plag.getT2().getTokenizedList()[i].isMarked()){
            t2Count++
         }

       }

       expect(t1Count).to.be.lessThan(5)
       expect(t2Count).to.be.lessThan(5)

    })

    it("Test where there should be a function that matches exactly", () => {
        let pro1 = new Project(['./src/test_submissions/Submission3MP.ts'])
        let pro2 = new Project(['./src/test_submissions/Submission4MP.ts'])
        let t1 = new Parser(pro1).getTokenManager()
        let t2 = new Parser(pro2).getTokenManager()
        let plag = new PlagiarismDetector(t1, t2, 15, 30)
        plag.rkr_gst()
        
        let t1Countx = 0
        for (var i = 0; i < t1.getTokenizedList().length; i++){
            if (plag.getT1().getTokenizedList()[i].isMarked()){
                t1Countx++
             }

        }
 
        let t2Countx = 0
        for (var i = 0; i < t2.getTokenizedList().length; i++){
         if (plag.getT2().getTokenizedList()[i].isMarked()){
             t2Countx++
          }

        }

       expect(t1Countx).to.equal(55)
       expect(t2Countx).to.equal(55)

    })


    it("test plagiarismdetector where every token sequence min and up should have a match", () => {
        let pro1 = new Project(['./src/test_submissions/GoodPerson.ts'])
        let pro2 = new Project(['./src/test_submissions/DeathEater.ts'])
        let t1 = new Parser(pro1).getTokenManager()
        let t2 = new Parser(pro2).getTokenManager()
        let plag = new PlagiarismDetector(t1, t2, 15, 20)
        plag.rkr_gst()

        expect(plag.getT1().getTokenizedList()[0].isMarked()).to.equal(true) // Keyword ---
        expect(plag.getT1().getTokenizedList()[1].isMarked()).to.equal(true) // Identifier ---
        expect(plag.getT1().getTokenizedList()[2].isMarked()).to.equal(true) // Punctuator ---
        expect(plag.getT1().getTokenizedList()[3].isMarked()).to.equal(true) // Identifier ---
        expect(plag.getT1().getTokenizedList()[4].isMarked()).to.equal(true) // Identifier --- 
        expect(plag.getT1().getTokenizedList()[5].isMarked()).to.equal(true) // Punctuator ---
        expect(plag.getT1().getTokenizedList()[6].isMarked()).to.equal(true) // Identifier ---
        expect(plag.getT1().getTokenizedList()[7].isMarked()).to.equal(true) // Identifier --- 
        expect(plag.getT1().getTokenizedList()[8].isMarked()).to.equal(true) // Identifier ---
        expect(plag.getT1().getTokenizedList()[9].isMarked()).to.equal(true) // Punctuator ---
        expect(plag.getT1().getTokenizedList()[10].isMarked()).to.equal(true) // Identifier ---
        expect(plag.getT1().getTokenizedList()[11].isMarked()).to.equal(true) // Identifier --- 
        expect(plag.getT1().getTokenizedList()[12].isMarked()).to.equal(true) // Identifier ---
        expect(plag.getT1().getTokenizedList()[13].isMarked()).to.equal(true)// Punctuator ---
        expect(plag.getT1().getTokenizedList()[14].isMarked()).to.equal(true) // Identifier ---
        expect(plag.getT1().getTokenizedList()[15].isMarked()).to.equal(true) // Punctuator ---
        expect(plag.getT1().getTokenizedList()[16].isMarked()).to.equal(true) // Identifier ---
        expect(plag.getT1().getTokenizedList()[17].isMarked()).to.equal(true) // PUNCTUATOR ---
        expect(plag.getT1().getTokenizedList()[18].isMarked()).to.equal(true) // PUNCTUATOR ---
        expect(plag.getT1().getTokenizedList()[19].isMarked()).to.equal(true) // identifier ---
        expect(plag.getT1().getTokenizedList()[20].isMarked()).to.equal(true) // PUNCTUATOR ---
        expect(plag.getT1().getTokenizedList()[21].isMarked()).to.equal(true) // identifier ---
        expect(plag.getT1().getTokenizedList()[22].isMarked()).to.equal(true) // identifier ---
        expect(plag.getT1().getTokenizedList()[23].isMarked()).to.equal(true) // PUNCTUATOR ---
        expect(plag.getT1().getTokenizedList()[24].isMarked()).to.equal(true) // identifier ---
        expect(plag.getT1().getTokenizedList()[25].isMarked()).to.equal(true) // PUNCTUATOR ---
        expect(plag.getT1().getTokenizedList()[26].isMarked()).to.equal(true) // PUNCTUATOR ---

        expect(plag.getT2().getTokenizedList()[0].isMarked()).to.equal(true) // Keyword ---
        expect(plag.getT2().getTokenizedList()[1].isMarked()).to.equal(true) // Identifier ---
        expect(plag.getT2().getTokenizedList()[2].isMarked()).to.equal(true) // Punctuator ---
        expect(plag.getT2().getTokenizedList()[3].isMarked()).to.equal(true) // Identifier ---
        expect(plag.getT2().getTokenizedList()[4].isMarked()).to.equal(true) // Identifier --- 
        expect(plag.getT2().getTokenizedList()[5].isMarked()).to.equal(true) // Punctuator ---
        expect(plag.getT2().getTokenizedList()[6].isMarked()).to.equal(true) // Identifier ---
        expect(plag.getT2().getTokenizedList()[7].isMarked()).to.equal(true) // Identifier --- 
        expect(plag.getT2().getTokenizedList()[8].isMarked()).to.equal(true) // Identifier ---
        expect(plag.getT2().getTokenizedList()[9].isMarked()).to.equal(true) // Punctuator ---
        expect(plag.getT2().getTokenizedList()[10].isMarked()).to.equal(true) // Identifier ---
        expect(plag.getT2().getTokenizedList()[11].isMarked()).to.equal(true) // Identifier --- 
        expect(plag.getT2().getTokenizedList()[12].isMarked()).to.equal(true) // Identifier ---
        expect(plag.getT2().getTokenizedList()[13].isMarked()).to.equal(true)// Punctuator ---
        expect(plag.getT2().getTokenizedList()[14].isMarked()).to.equal(true) // Identifier ---
        expect(plag.getT2().getTokenizedList()[15].isMarked()).to.equal(true) // Punctuator ---
        expect(plag.getT2().getTokenizedList()[16].isMarked()).to.equal(true) // Identifier ---
        expect(plag.getT2().getTokenizedList()[17].isMarked()).to.equal(true) // PUNCTUATOR ---
        expect(plag.getT2().getTokenizedList()[18].isMarked()).to.equal(true) // PUNCTUATOR ---
        expect(plag.getT2().getTokenizedList()[19].isMarked()).to.equal(true) // identifier ---
        expect(plag.getT2().getTokenizedList()[20].isMarked()).to.equal(true) // PUNCTUATOR ---
        expect(plag.getT2().getTokenizedList()[21].isMarked()).to.equal(true) // identifier ---
        expect(plag.getT2().getTokenizedList()[22].isMarked()).to.equal(true) // identifier ---
        expect(plag.getT2().getTokenizedList()[23].isMarked()).to.equal(true) // PUNCTUATOR ---
        expect(plag.getT2().getTokenizedList()[24].isMarked()).to.equal(true) // identifier ---
        expect(plag.getT2().getTokenizedList()[25].isMarked()).to.equal(true) // PUNCTUATOR ---
        expect(plag.getT2().getTokenizedList()[26].isMarked()).to.equal(true) // PUNCTUATOR ---
    })  

    it("test plagiarismdetector comparing regular submission with a submission of 1 char, and where nothing should match", () => {
        let pro1 = new Project(['./src/test_submissions/GoodPerson.ts'])
        let pro2 = new Project(['./src/test_submissions/OneChar.ts'])
        let t1 = new Parser(pro1).getTokenManager()
        let t2 = new Parser(pro2).getTokenManager()
        let plag = new PlagiarismDetector(t1, t2, 1, 1)
        plag.rkr_gst()

        expect(t1.getTokenizedList()[0].isMarked()).to.equal(false) // Keyword ---
        expect(t1.getTokenizedList()[1].isMarked()).to.equal(false) // Identifier ---
        expect(t1.getTokenizedList()[2].isMarked()).to.equal(false) // Punctuator ---
        expect(t1.getTokenizedList()[3].isMarked()).to.equal(false) // Identifier ---
        expect(t1.getTokenizedList()[4].isMarked()).to.equal(false) // Identifier --- 
        expect(t1.getTokenizedList()[5].isMarked()).to.equal(false) // Punctuator ---
        expect(t1.getTokenizedList()[6].isMarked()).to.equal(false) // Identifier ---
        expect(t1.getTokenizedList()[7].isMarked()).to.equal(false) // Identifier --- 
        expect(t1.getTokenizedList()[8].isMarked()).to.equal(false) // Identifier ---
        expect(t1.getTokenizedList()[9].isMarked()).to.equal(false) // Punctuator ---
        expect(t1.getTokenizedList()[10].isMarked()).to.equal(false) // Identifier ---
        expect(t1.getTokenizedList()[11].isMarked()).to.equal(false) // Identifier --- 
        expect(t1.getTokenizedList()[12].isMarked()).to.equal(false) // Identifier ---
        expect(t1.getTokenizedList()[13].isMarked()).to.equal(false)// Punctuator ---
        expect(t1.getTokenizedList()[14].isMarked()).to.equal(false) // Identifier ---
        expect(t1.getTokenizedList()[15].isMarked()).to.equal(false) // Punctuator ---
        expect(t1.getTokenizedList()[16].isMarked()).to.equal(false) // Identifier ---
        expect(t1.getTokenizedList()[17].isMarked()).to.equal(false) // PUNCTUATOR ---
        expect(t1.getTokenizedList()[18].isMarked()).to.equal(false) // PUNCTUATOR ---
        expect(t1.getTokenizedList()[19].isMarked()).to.equal(false) // identifier ---
        expect(t1.getTokenizedList()[20].isMarked()).to.equal(false) // PUNCTUATOR ---
        expect(t1.getTokenizedList()[21].isMarked()).to.equal(false) // identifier ---
        expect(t1.getTokenizedList()[22].isMarked()).to.equal(false) // identifier ---
        expect(t1.getTokenizedList()[23].isMarked()).to.equal(false) // PUNCTUATOR ---
        expect(t1.getTokenizedList()[24].isMarked()).to.equal(false) // identifier ---
        expect(t1.getTokenizedList()[25].isMarked()).to.equal(false) // PUNCTUATOR ---
        expect(t1.getTokenizedList()[26].isMarked()).to.equal(false) // PUNCTUATOR ---
        expect(t2.getTokenizedList()[0].isMarked()).to.equal(false) // Keyword ---
    })

    it("test plagiarismdetector where there are comments, end of files should not match", () => {
        let pro1 = new Project(['./src/test_submissions/Submission3withComments.ts'])
        let pro2 = new Project(['./src/test_submissions/Submission4.ts'])
        let t1 = new Parser(pro1).getTokenManager()
        let t2 = new Parser(pro2).getTokenManager()
        let plag = new PlagiarismDetector(t1, t2, 6, 15)
        plag.rkr_gst()

        let t1Countx = 0
        for (var i = 0; i < t1.getTokenizedList().length; i++){
            if (plag.getT1().getTokenizedList()[i].isMarked()){
                t1Countx++
             }

        }
 
        let t2Countx = 0
        for (var i = 0; i < t2.getTokenizedList().length; i++){
         if (plag.getT2().getTokenizedList()[i].isMarked()){
             t2Countx++
          }

        }

        expect(t1Countx).to.greaterThan(20)
        expect(t2Countx).to.greaterThan(20)

        expect(t1.getTokenizedList()[23].isMarked()).to.equal(false) // Punctuator
        expect(t2.getTokenizedList()[39].isMarked()).to.equal(false)//Numeric
        expect(t2.getTokenizedList()[40].isMarked()).to.equal(false)//punctuator
        expect(t2.getTokenizedList()[41].isMarked()).to.equal(false)//punctuator
    })

    // For all tests below this, the project input param to token manager is irrelevant. 
    // The range input in the Token class is also irrelevant for these tests. 
    it("test plagiarismdetector on English sentence, where there are two matches of length 4 and a match of length 2 that should not be marked; initial search length 12", () => { 
        let t1 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sally", "Sally", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Seattle", "Seattle", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("rocks.", "rocks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))
        let t2 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sandra", "Sandra", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Saugus", "Saugus", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("sucks.", "sucks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))
        let plag = new PlagiarismDetector(t1, t2, 3, 12)
        plag.rkr_gst()

        expect(t1.getTokenizedList()[0].isMarked()).to.equal(true) // hello
        expect(t1.getTokenizedList()[1].isMarked()).to.equal(true) // world
        expect(t1.getTokenizedList()[2].isMarked()).to.equal(true) // my
        expect(t1.getTokenizedList()[3].isMarked()).to.equal(true) // name
        expect(t1.getTokenizedList()[4].isMarked()).to.equal(true) // is
        expect(t1.getTokenizedList()[5].isMarked()).to.equal(false) // Sally
        expect(t1.getTokenizedList()[6].isMarked()).to.equal(true) // and
        expect(t1.getTokenizedList()[7].isMarked()).to.equal(true) // I 
        expect(t1.getTokenizedList()[8].isMarked()).to.equal(true) // live
        expect(t1.getTokenizedList()[9].isMarked()).to.equal(true) // in
        expect(t1.getTokenizedList()[10].isMarked()).to.equal(false) // Seattle
        expect(t1.getTokenizedList()[11].isMarked()).to.equal(false) // because
        expect(t1.getTokenizedList()[12].isMarked()).to.equal(false) // it
        expect(t1.getTokenizedList()[13].isMarked()).to.equal(false)// rocks

        expect(t2.getTokenizedList()[0].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[1].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[2].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[3].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[4].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[5].isMarked()).to.equal(false)
        expect(t2.getTokenizedList()[6].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[7].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[8].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[9].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[10].isMarked()).to.equal(false)
        expect(t2.getTokenizedList()[11].isMarked()).to.equal(false)
        expect(t2.getTokenizedList()[12].isMarked()).to.equal(false)
        expect(t2.getTokenizedList()[13].isMarked()).to.equal(false)
    })

    it("test plagiarismdetector where there are two matches of length 4 and a match of length 2 that should not be marked; initial search length 14", () => {
        let t1 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sally", "Sally", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Seattle", "Seattle", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("rocks.", "rocks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))
        let t2 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sandra", "Sandra", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Saugus", "Saugus", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("sucks.", "sucks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))
        let plag = new PlagiarismDetector(t1, t2, 3, 14)
        plag.rkr_gst()

        expect(t1.getTokenizedList()[0].isMarked()).to.equal(true) // hello
        expect(t1.getTokenizedList()[1].isMarked()).to.equal(true) // world
        expect(t1.getTokenizedList()[2].isMarked()).to.equal(true) // my
        expect(t1.getTokenizedList()[3].isMarked()).to.equal(true) // name
        expect(t1.getTokenizedList()[4].isMarked()).to.equal(true) // is
        expect(t1.getTokenizedList()[5].isMarked()).to.equal(false) // Sally
        expect(t1.getTokenizedList()[6].isMarked()).to.equal(true) // and
        expect(t1.getTokenizedList()[7].isMarked()).to.equal(true) // I 
        expect(t1.getTokenizedList()[8].isMarked()).to.equal(true) // live
        expect(t1.getTokenizedList()[9].isMarked()).to.equal(true) // in
        expect(t1.getTokenizedList()[10].isMarked()).to.equal(false) // Seattle
        expect(t1.getTokenizedList()[11].isMarked()).to.equal(false) // because
        expect(t1.getTokenizedList()[12].isMarked()).to.equal(false) // it
        expect(t1.getTokenizedList()[13].isMarked()).to.equal(false)// rocks

        expect(t2.getTokenizedList()[0].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[1].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[2].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[3].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[4].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[5].isMarked()).to.equal(false)
        expect(t2.getTokenizedList()[6].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[7].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[8].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[9].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[10].isMarked()).to.equal(false)
        expect(t2.getTokenizedList()[11].isMarked()).to.equal(false)
        expect(t2.getTokenizedList()[12].isMarked()).to.equal(false)
        expect(t2.getTokenizedList()[13].isMarked()).to.equal(false)
    })

    it("test plagiarismdetector where there are two matches of length 4 and a match of length 2 that should not be marked; initial search length 4", () => {
        let t1 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sally", "Sally", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Seattle", "Seattle", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("rocks.", "rocks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))
        let t2 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sandra", "Sandra", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Saugus", "Saugus", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("sucks.", "sucks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))
        let plag = new PlagiarismDetector(t1, t2, 3, 4)
        plag.rkr_gst()

        expect(t1.getTokenizedList()[0].isMarked()).to.equal(true) // hello
        expect(t1.getTokenizedList()[1].isMarked()).to.equal(true) // world
        expect(t1.getTokenizedList()[2].isMarked()).to.equal(true) // my
        expect(t1.getTokenizedList()[3].isMarked()).to.equal(true) // name
        expect(t1.getTokenizedList()[4].isMarked()).to.equal(true) // is
        expect(t1.getTokenizedList()[5].isMarked()).to.equal(false) // Sally
        expect(t1.getTokenizedList()[6].isMarked()).to.equal(true) // and
        expect(t1.getTokenizedList()[7].isMarked()).to.equal(true) // I 
        expect(t1.getTokenizedList()[8].isMarked()).to.equal(true) // live
        expect(t1.getTokenizedList()[9].isMarked()).to.equal(true) // in
        expect(t1.getTokenizedList()[10].isMarked()).to.equal(false) // Seattle
        expect(t1.getTokenizedList()[11].isMarked()).to.equal(false) // because
        expect(t1.getTokenizedList()[12].isMarked()).to.equal(false) // it
        expect(t1.getTokenizedList()[13].isMarked()).to.equal(false)// rocks

        expect(t2.getTokenizedList()[0].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[1].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[2].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[3].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[4].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[5].isMarked()).to.equal(false)
        expect(t2.getTokenizedList()[6].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[7].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[8].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[9].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[10].isMarked()).to.equal(false)
        expect(t2.getTokenizedList()[11].isMarked()).to.equal(false)
        expect(t2.getTokenizedList()[12].isMarked()).to.equal(false)
        expect(t2.getTokenizedList()[13].isMarked()).to.equal(false)
    })

    it("test plagiarismdetector where there are two matches of length 4 and a match of length 2 that should not be marked; initial search length 12", () => {
        let t1 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sally", "Sally", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Seattle", "Seattle", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("rocks.", "rocks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))
        let t2 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sandra", "Sandra", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Saugus", "Saugus", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("sucks.", "sucks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))
        let plag = new PlagiarismDetector(t1, t2, 4, 12)
        plag.rkr_gst()

        expect(t1.getTokenizedList()[0].isMarked()).to.equal(true) // hello
        expect(t1.getTokenizedList()[1].isMarked()).to.equal(true) // world
        expect(t1.getTokenizedList()[2].isMarked()).to.equal(true) // my
        expect(t1.getTokenizedList()[3].isMarked()).to.equal(true) // name
        expect(t1.getTokenizedList()[4].isMarked()).to.equal(true) // is
        expect(t1.getTokenizedList()[5].isMarked()).to.equal(false) // Sally
        expect(t1.getTokenizedList()[6].isMarked()).to.equal(true) // and
        expect(t1.getTokenizedList()[7].isMarked()).to.equal(true) // I 
        expect(t1.getTokenizedList()[8].isMarked()).to.equal(true) // live
        expect(t1.getTokenizedList()[9].isMarked()).to.equal(true) // in
        expect(t1.getTokenizedList()[10].isMarked()).to.equal(false) // Seattle
        expect(t1.getTokenizedList()[11].isMarked()).to.equal(false) // because
        expect(t1.getTokenizedList()[12].isMarked()).to.equal(false) // it
        expect(t1.getTokenizedList()[13].isMarked()).to.equal(false)// rocks

        expect(t2.getTokenizedList()[0].isMarked()).to.equal(true) // hello
        expect(t2.getTokenizedList()[1].isMarked()).to.equal(true) // world
        expect(t2.getTokenizedList()[2].isMarked()).to.equal(true) // my
        expect(t2.getTokenizedList()[3].isMarked()).to.equal(true) // name
        expect(t2.getTokenizedList()[4].isMarked()).to.equal(true) // is
        expect(t2.getTokenizedList()[5].isMarked()).to.equal(false)
        expect(t2.getTokenizedList()[6].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[7].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[8].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[9].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[10].isMarked()).to.equal(false)
        expect(t2.getTokenizedList()[11].isMarked()).to.equal(false)
        expect(t2.getTokenizedList()[12].isMarked()).to.equal(false)
        expect(t2.getTokenizedList()[13].isMarked()).to.equal(false)
    })

    it("test plagiarismdetector where there are two matches of length 4 and a match of length 2 that should not be marked; initial search length 12 and min search length of 2", () => {
        let t1 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sally", "Sally", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Seattle", "Seattle", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("rocks.", "rocks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))
        let t2 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sandra", "Sandra", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Saugus", "Saugus", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("sucks.", "sucks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))
        let plag = new PlagiarismDetector(t1, t2, 2, 12)
        plag.rkr_gst()

        expect(t1.getTokenizedList()[0].isMarked()).to.equal(true) // hello
        expect(t1.getTokenizedList()[1].isMarked()).to.equal(true) // world
        expect(t1.getTokenizedList()[2].isMarked()).to.equal(true) // my
        expect(t1.getTokenizedList()[3].isMarked()).to.equal(true) // name
        expect(t1.getTokenizedList()[4].isMarked()).to.equal(true) // is
        expect(t1.getTokenizedList()[5].isMarked()).to.equal(false) // Sally
        expect(t1.getTokenizedList()[6].isMarked()).to.equal(true) // and
        expect(t1.getTokenizedList()[7].isMarked()).to.equal(true) // I 
        expect(t1.getTokenizedList()[8].isMarked()).to.equal(true) // live
        expect(t1.getTokenizedList()[9].isMarked()).to.equal(true) // in
        expect(t1.getTokenizedList()[10].isMarked()).to.equal(false) // Seattle
        expect(t1.getTokenizedList()[11].isMarked()).to.equal(true) // because
        expect(t1.getTokenizedList()[12].isMarked()).to.equal(true) // it
        expect(t1.getTokenizedList()[13].isMarked()).to.equal(false)// rocks

        expect(t2.getTokenizedList()[0].isMarked()).to.equal(true) // hello
        expect(t2.getTokenizedList()[1].isMarked()).to.equal(true) // world
        expect(t2.getTokenizedList()[2].isMarked()).to.equal(true) // my
        expect(t2.getTokenizedList()[3].isMarked()).to.equal(true) // name
        expect(t2.getTokenizedList()[4].isMarked()).to.equal(true) // is
        expect(t2.getTokenizedList()[5].isMarked()).to.equal(false)
        expect(t2.getTokenizedList()[6].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[7].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[8].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[9].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[10].isMarked()).to.equal(false)
        expect(t2.getTokenizedList()[11].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[12].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[13].isMarked()).to.equal(false)
    })

    it("test plagiarismdetector where all words match", () => {
        let t1 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sally", "Sally", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Seattle", "Seattle", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("rocks.", "rocks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))
        let t2 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sally", "Sally", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Seattle", "Seattle", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("rocks.", "rocks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))
        let plag = new PlagiarismDetector(t1, t2, 4, 12)
        plag.rkr_gst()

        expect(t1.getTokenizedList()[0].isMarked()).to.equal(true) // hello
        expect(t1.getTokenizedList()[1].isMarked()).to.equal(true) // world
        expect(t1.getTokenizedList()[2].isMarked()).to.equal(true) // my
        expect(t1.getTokenizedList()[3].isMarked()).to.equal(true) // name
        expect(t1.getTokenizedList()[4].isMarked()).to.equal(true) // is
        expect(t1.getTokenizedList()[5].isMarked()).to.equal(true) // Sally
        expect(t1.getTokenizedList()[6].isMarked()).to.equal(true) // and
        expect(t1.getTokenizedList()[7].isMarked()).to.equal(true) // I 
        expect(t1.getTokenizedList()[8].isMarked()).to.equal(true) // live
        expect(t1.getTokenizedList()[9].isMarked()).to.equal(true) // in
        expect(t1.getTokenizedList()[10].isMarked()).to.equal(true) // Seattle
        expect(t1.getTokenizedList()[11].isMarked()).to.equal(true) // because
        expect(t1.getTokenizedList()[12].isMarked()).to.equal(true) // it
        expect(t1.getTokenizedList()[13].isMarked()).to.equal(true)// rocks

        expect(t2.getTokenizedList()[0].isMarked()).to.equal(true) // hello
        expect(t2.getTokenizedList()[1].isMarked()).to.equal(true) // world
        expect(t2.getTokenizedList()[2].isMarked()).to.equal(true) // my
        expect(t2.getTokenizedList()[3].isMarked()).to.equal(true) // name
        expect(t2.getTokenizedList()[4].isMarked()).to.equal(true) // is
        expect(t2.getTokenizedList()[5].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[6].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[7].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[8].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[9].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[10].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[11].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[12].isMarked()).to.equal(true)
        expect(t2.getTokenizedList()[13].isMarked()).to.equal(true)
    })

    it("test plagiarismdetector where no words match", () => {
        let t1 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sally", "Sally", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Seattle", "Seattle", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("rocks.", "rocks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))
        let t2 = new TokenManager([new Token("hi", "hi", [0,0]), new Token("land", "land", [0,0]), 
            new Token("I", "I", [0,0]), new Token("am", "am", [0,0]), new Token("called", "called", [0,0]), 
            new Token("Sandra", "Sandra", [0,0]), new Token("or", "or", [0,0]), new Token("you", "you", [0,0]), 
            new Token("can", "can", [0,0]), new Token("call", "call", [0,0]), new Token("me", "me", [0,0]), 
            new Token("Sandy", "Sandy", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))
        let plag = new PlagiarismDetector(t1, t2, 4, 12)
        plag.rkr_gst()

        expect(t1.getTokenizedList()[0].isMarked()).to.equal(false) // hello
        expect(t1.getTokenizedList()[1].isMarked()).to.equal(false) // world
        expect(t1.getTokenizedList()[2].isMarked()).to.equal(false) // my
        expect(t1.getTokenizedList()[3].isMarked()).to.equal(false) // name
        expect(t1.getTokenizedList()[4].isMarked()).to.equal(false) // is
        expect(t1.getTokenizedList()[5].isMarked()).to.equal(false) // Sally
        expect(t1.getTokenizedList()[6].isMarked()).to.equal(false) // and
        expect(t1.getTokenizedList()[7].isMarked()).to.equal(false) // I 
        expect(t1.getTokenizedList()[8].isMarked()).to.equal(false) // live
        expect(t1.getTokenizedList()[9].isMarked()).to.equal(false) // in
        expect(t1.getTokenizedList()[10].isMarked()).to.equal(false) // Seattle
        expect(t1.getTokenizedList()[11].isMarked()).to.equal(false) // because
        expect(t1.getTokenizedList()[12].isMarked()).to.equal(false) // it
        expect(t1.getTokenizedList()[13].isMarked()).to.equal(false)// rocks

        expect(t2.getTokenizedList()[0].isMarked()).to.equal(false) // hello
        expect(t2.getTokenizedList()[1].isMarked()).to.equal(false) // world
        expect(t2.getTokenizedList()[2].isMarked()).to.equal(false) // my
        expect(t2.getTokenizedList()[3].isMarked()).to.equal(false) // name
        expect(t2.getTokenizedList()[4].isMarked()).to.equal(false) // is
        expect(t2.getTokenizedList()[5].isMarked()).to.equal(false)
        expect(t2.getTokenizedList()[6].isMarked()).to.equal(false)
        expect(t2.getTokenizedList()[7].isMarked()).to.equal(false)
        expect(t2.getTokenizedList()[8].isMarked()).to.equal(false)
        expect(t2.getTokenizedList()[9].isMarked()).to.equal(false)
        expect(t2.getTokenizedList()[10].isMarked()).to.equal(false)
        expect(t2.getTokenizedList()[11].isMarked()).to.equal(false)
    })

    it("test plagiarismdetector where words are substrings of each other (world vs worlds)", () => {
        let t1 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("worlds", "worlds", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sally", "Sally", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Seattle", "Seattle", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("rocks.", "rocks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))
        let t2 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sandra", "Sandra", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Saugus", "Saugus", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("sucks.", "sucks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))
        let plag = new PlagiarismDetector(t1, t2, 4, 12)
        plag.rkr_gst()

        expect(t1.getTokenizedList()[0].isMarked()).to.equal(false) // hello
        expect(t1.getTokenizedList()[1].isMarked()).to.equal(false) // world
        expect(t1.getTokenizedList()[2].isMarked()).to.equal(false) // my
        expect(t1.getTokenizedList()[3].isMarked()).to.equal(false) // name
        expect(t1.getTokenizedList()[4].isMarked()).to.equal(false) // is
        expect(t1.getTokenizedList()[5].isMarked()).to.equal(false) // Sally
        expect(t1.getTokenizedList()[6].isMarked()).to.equal(true) // and
        expect(t1.getTokenizedList()[7].isMarked()).to.equal(true) // I 
        expect(t1.getTokenizedList()[8].isMarked()).to.equal(true) // live
        expect(t1.getTokenizedList()[9].isMarked()).to.equal(true) // in
        expect(t1.getTokenizedList()[10].isMarked()).to.equal(false) // Seattle
        expect(t1.getTokenizedList()[11].isMarked()).to.equal(false) // because
        expect(t1.getTokenizedList()[12].isMarked()).to.equal(false) // it
        expect(t1.getTokenizedList()[13].isMarked()).to.equal(false)// rocks

        expect(t2.getTokenizedList()[0].isMarked()).to.equal(false) // hello
        expect(t2.getTokenizedList()[1].isMarked()).to.equal(false) // world
        expect(t2.getTokenizedList()[2].isMarked()).to.equal(false) // my
        expect(t2.getTokenizedList()[3].isMarked()).to.equal(false) // name
        expect(t2.getTokenizedList()[4].isMarked()).to.equal(false) // is
        expect(t2.getTokenizedList()[5].isMarked()).to.equal(false) // Sandra
        expect(t2.getTokenizedList()[6].isMarked()).to.equal(true) // and 
        expect(t2.getTokenizedList()[7].isMarked()).to.equal(true) // I
        expect(t2.getTokenizedList()[8].isMarked()).to.equal(true) // live
        expect(t2.getTokenizedList()[9].isMarked()).to.equal(true) // in
        expect(t2.getTokenizedList()[10].isMarked()).to.equal(false) // Saugus
        expect(t2.getTokenizedList()[11].isMarked()).to.equal(false) // becasue
        expect(t2.getTokenizedList()[12].isMarked()).to.equal(false) // it
        expect(t2.getTokenizedList()[13].isMarked()).to.equal(false) // sucks
    })

    it("test plagiarismdetector where a match appears twice in t1 and once in t2", () => {
        let t1 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sally", "Sally", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Seattle", "Seattle", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("rocks.", "rocks", [0,0]), 
            new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))
        let t2 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sandra", "Sandra", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Saugus", "Saugus", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("sucks.", "sucks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))
        let plag = new PlagiarismDetector(t1, t2, 4, 12)
        plag.rkr_gst()

        expect(t1.getTokenizedList()[0].isMarked()).to.equal(true) // hello
        expect(t1.getTokenizedList()[1].isMarked()).to.equal(true) // world
        expect(t1.getTokenizedList()[2].isMarked()).to.equal(true) // my
        expect(t1.getTokenizedList()[3].isMarked()).to.equal(true) // name
        expect(t1.getTokenizedList()[4].isMarked()).to.equal(true) // is
        expect(t1.getTokenizedList()[5].isMarked()).to.equal(false) // Sally
        expect(t1.getTokenizedList()[6].isMarked()).to.equal(true) // and
        expect(t1.getTokenizedList()[7].isMarked()).to.equal(true) // I 
        expect(t1.getTokenizedList()[8].isMarked()).to.equal(true) // live
        expect(t1.getTokenizedList()[9].isMarked()).to.equal(true) // in
        expect(t1.getTokenizedList()[10].isMarked()).to.equal(false) // Seattle
        expect(t1.getTokenizedList()[11].isMarked()).to.equal(false) // because
        expect(t1.getTokenizedList()[12].isMarked()).to.equal(false) // it
        expect(t1.getTokenizedList()[13].isMarked()).to.equal(false)// rocks
        expect(t1.getTokenizedList()[14].isMarked()).to.equal(true) // hello
        expect(t1.getTokenizedList()[15].isMarked()).to.equal(true) // world
        expect(t1.getTokenizedList()[16].isMarked()).to.equal(true) // my
        expect(t1.getTokenizedList()[17].isMarked()).to.equal(true)// name
        expect(t1.getTokenizedList()[18].isMarked()).to.equal(true)// is

        expect(t2.getTokenizedList()[0].isMarked()).to.equal(true) // hello
        expect(t2.getTokenizedList()[1].isMarked()).to.equal(true) // world
        expect(t2.getTokenizedList()[2].isMarked()).to.equal(true) // my
        expect(t2.getTokenizedList()[3].isMarked()).to.equal(true) // name
        expect(t2.getTokenizedList()[4].isMarked()).to.equal(true) // is
        expect(t2.getTokenizedList()[5].isMarked()).to.equal(false) // Sandra
        expect(t2.getTokenizedList()[6].isMarked()).to.equal(true) // and 
        expect(t2.getTokenizedList()[7].isMarked()).to.equal(true) // I
        expect(t2.getTokenizedList()[8].isMarked()).to.equal(true) // live
        expect(t2.getTokenizedList()[9].isMarked()).to.equal(true) // in
        expect(t2.getTokenizedList()[10].isMarked()).to.equal(false) // Saugus
        expect(t2.getTokenizedList()[11].isMarked()).to.equal(false) // becasue
        expect(t2.getTokenizedList()[12].isMarked()).to.equal(false) // it
        expect(t2.getTokenizedList()[13].isMarked()).to.equal(false) // sucks
    })

    it("test plagiarismdetector where a match appears twice in t2 and once in t1", () => {
        let t1 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
        new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
        new Token("Sandra", "Sandra", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
        new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Saugus", "Saugus", [0,0]), 
        new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("sucks.", "sucks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))
        let t2 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sally", "Sally", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Seattle", "Seattle", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("rocks.", "rocks", [0,0]), 
            new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))

        let plag = new PlagiarismDetector(t1, t2, 4, 12)
        plag.rkr_gst()

        expect(t2.getTokenizedList()[0].isMarked()).to.equal(true) // hello
        expect(t2.getTokenizedList()[1].isMarked()).to.equal(true) // world
        expect(t2.getTokenizedList()[2].isMarked()).to.equal(true) // my
        expect(t2.getTokenizedList()[3].isMarked()).to.equal(true) // name
        expect(t2.getTokenizedList()[4].isMarked()).to.equal(true) // is
        expect(t2.getTokenizedList()[5].isMarked()).to.equal(false) // Sally
        expect(t2.getTokenizedList()[6].isMarked()).to.equal(true) // and
        expect(t2.getTokenizedList()[7].isMarked()).to.equal(true) // I 
        expect(t2.getTokenizedList()[8].isMarked()).to.equal(true) // live
        expect(t2.getTokenizedList()[9].isMarked()).to.equal(true) // in
        expect(t2.getTokenizedList()[10].isMarked()).to.equal(false) // Seattle
        expect(t2.getTokenizedList()[11].isMarked()).to.equal(false) // because
        expect(t2.getTokenizedList()[12].isMarked()).to.equal(false) // it
        expect(t2.getTokenizedList()[13].isMarked()).to.equal(false)// rocks
        expect(t2.getTokenizedList()[14].isMarked()).to.equal(true) // hello
        expect(t2.getTokenizedList()[15].isMarked()).to.equal(true) // world
        expect(t2.getTokenizedList()[16].isMarked()).to.equal(true) // my
        expect(t2.getTokenizedList()[17].isMarked()).to.equal(true)// name
        expect(t2.getTokenizedList()[18].isMarked()).to.equal(true)// is

        expect(t1.getTokenizedList()[0].isMarked()).to.equal(true) // hello
        expect(t1.getTokenizedList()[1].isMarked()).to.equal(true) // world
        expect(t1.getTokenizedList()[2].isMarked()).to.equal(true) // my
        expect(t1.getTokenizedList()[3].isMarked()).to.equal(true) // name
        expect(t1.getTokenizedList()[4].isMarked()).to.equal(true) // is
        expect(t1.getTokenizedList()[5].isMarked()).to.equal(false) // Sandra
        expect(t1.getTokenizedList()[6].isMarked()).to.equal(true) // and 
        expect(t1.getTokenizedList()[7].isMarked()).to.equal(true) // I
        expect(t1.getTokenizedList()[8].isMarked()).to.equal(true) // live
        expect(t1.getTokenizedList()[9].isMarked()).to.equal(true) // in
        expect(t1.getTokenizedList()[10].isMarked()).to.equal(false) // Saugus
        expect(t1.getTokenizedList()[11].isMarked()).to.equal(false) // becasue
        expect(t1.getTokenizedList()[12].isMarked()).to.equal(false) // it
        expect(t1.getTokenizedList()[13].isMarked()).to.equal(false) // sucks
    })

    it("test plagiarismdetector where all words are the same within a submission and both submissions match", () => {
        let t1 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("hello", "hello", [0,0]), 
        new Token("hello", "hello", [0,0]), new Token("hello", "hello", [0,0]), new Token("hello", "hello", [0,0]), 
        new Token("hello", "hello", [0,0]), new Token("hello", "hello", [0,0]), new Token("hello", "hello", [0,0]), 
        new Token("hello", "hello", [0,0]), new Token("hello", "hello", [0,0]), new Token("hello", "hello", [0,0]), 
        new Token("hello", "hello", [0,0]), new Token("hello", "hello", [0,0]), new Token("hello.", "hello", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))
        let t2 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("hello", "hello", [0,0]), 
        new Token("hello", "hello", [0,0]), new Token("hello", "hello", [0,0]), new Token("hello", "hello", [0,0]), 
        new Token("hello", "hello", [0,0]), new Token("hello", "hello", [0,0]), new Token("hello", "hello", [0,0]), 
        new Token("hello", "hello", [0,0]), new Token("hello", "hello", [0,0]), new Token("hello", "hello", [0,0]), 
        new Token("hello", "hello", [0,0]), new Token("hello", "hello", [0,0]), new Token("hello.", "hello", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))

        let plag = new PlagiarismDetector(t1, t2, 4, 12)
        plag.rkr_gst()

        expect(t2.getTokenizedList()[0].isMarked()).to.equal(true) // hello
        expect(t2.getTokenizedList()[1].isMarked()).to.equal(true) // world
        expect(t2.getTokenizedList()[2].isMarked()).to.equal(true) // my
        expect(t2.getTokenizedList()[3].isMarked()).to.equal(true) // name
        expect(t2.getTokenizedList()[4].isMarked()).to.equal(true) // is
        expect(t2.getTokenizedList()[5].isMarked()).to.equal(true) // Sally
        expect(t2.getTokenizedList()[6].isMarked()).to.equal(true) // and
        expect(t2.getTokenizedList()[7].isMarked()).to.equal(true) // I 
        expect(t2.getTokenizedList()[8].isMarked()).to.equal(true) // live
        expect(t2.getTokenizedList()[9].isMarked()).to.equal(true) // in
        expect(t2.getTokenizedList()[10].isMarked()).to.equal(true) // Seattle
        expect(t2.getTokenizedList()[11].isMarked()).to.equal(true) // because
        expect(t2.getTokenizedList()[12].isMarked()).to.equal(true) // it
        expect(t2.getTokenizedList()[13].isMarked()).to.equal(true)// rocks

        expect(t1.getTokenizedList()[0].isMarked()).to.equal(true) // hello
        expect(t1.getTokenizedList()[1].isMarked()).to.equal(true) // world
        expect(t1.getTokenizedList()[2].isMarked()).to.equal(true) // my
        expect(t1.getTokenizedList()[3].isMarked()).to.equal(true) // name
        expect(t1.getTokenizedList()[4].isMarked()).to.equal(true) // is
        expect(t1.getTokenizedList()[5].isMarked()).to.equal(true) // Sandra
        expect(t1.getTokenizedList()[6].isMarked()).to.equal(true) // and 
        expect(t1.getTokenizedList()[7].isMarked()).to.equal(true) // I
        expect(t1.getTokenizedList()[8].isMarked()).to.equal(true) // live
        expect(t1.getTokenizedList()[9].isMarked()).to.equal(true) // in
        expect(t1.getTokenizedList()[10].isMarked()).to.equal(true) // Saugus
        expect(t1.getTokenizedList()[11].isMarked()).to.equal(true) // becasue
        expect(t1.getTokenizedList()[12].isMarked()).to.equal(true) // it
        expect(t1.getTokenizedList()[13].isMarked()).to.equal(true) // sucks
    })

    it("test plagiarismdetector where where matches do not start at same index", () => {
        let t1 = new TokenManager([new Token("good", "good", [0,0]), new Token("morning", "morning", [0,0]), 
        new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sally", "Sally", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Seattle", "Seattle", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("rocks.", "rocks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))
        let t2 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sandra", "Sandra", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Saugus", "Saugus", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("sucks.", "sucks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))

        let plag = new PlagiarismDetector(t1, t2, 4, 12)
        plag.rkr_gst()


        expect(t1.getTokenizedList()[0].isMarked()).to.equal(false) // good 
        expect(t1.getTokenizedList()[1].isMarked()).to.equal(false) // morning
        expect(t1.getTokenizedList()[2].isMarked()).to.equal(true) // hello
        expect(t1.getTokenizedList()[3].isMarked()).to.equal(true) // world
        expect(t1.getTokenizedList()[4].isMarked()).to.equal(true) // my
        expect(t1.getTokenizedList()[5].isMarked()).to.equal(true) // name
        expect(t1.getTokenizedList()[6].isMarked()).to.equal(true) // is 
        expect(t1.getTokenizedList()[7].isMarked()).to.equal(false) // Sally
        expect(t1.getTokenizedList()[8].isMarked()).to.equal(true) // and
        expect(t1.getTokenizedList()[9].isMarked()).to.equal(true) // I
        expect(t1.getTokenizedList()[10].isMarked()).to.equal(true) // live
        expect(t1.getTokenizedList()[11].isMarked()).to.equal(true) // in
        expect(t1.getTokenizedList()[12].isMarked()).to.equal(false) // Seattle
        expect(t1.getTokenizedList()[13].isMarked()).to.equal(false) // becasue
        expect(t1.getTokenizedList()[14].isMarked()).to.equal(false) // it
        expect(t1.getTokenizedList()[15].isMarked()).to.equal(false) // rocks

        expect(t2.getTokenizedList()[0].isMarked()).to.equal(true) // hello
        expect(t2.getTokenizedList()[1].isMarked()).to.equal(true) // world
        expect(t2.getTokenizedList()[2].isMarked()).to.equal(true) // my
        expect(t2.getTokenizedList()[3].isMarked()).to.equal(true) // name
        expect(t2.getTokenizedList()[4].isMarked()).to.equal(true) // is
        expect(t2.getTokenizedList()[5].isMarked()).to.equal(false) // Sandra
        expect(t2.getTokenizedList()[6].isMarked()).to.equal(true) // and
        expect(t2.getTokenizedList()[7].isMarked()).to.equal(true) // I 
        expect(t2.getTokenizedList()[8].isMarked()).to.equal(true) // live
        expect(t2.getTokenizedList()[9].isMarked()).to.equal(true) // in
        expect(t2.getTokenizedList()[10].isMarked()).to.equal(false) // Saugus
        expect(t2.getTokenizedList()[11].isMarked()).to.equal(false) // because
        expect(t2.getTokenizedList()[12].isMarked()).to.equal(false) // it
        expect(t2.getTokenizedList()[13].isMarked()).to.equal(false)// sucks
    
    })

    it("test plagiarismdetector where t1 is undefined", () => {
        try {
            let t2 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sandra", "Sandra", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Saugus", "Saugus", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("sucks.", "sucks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))

            let plag = new PlagiarismDetector(undefined, t2, 4, 12)
            fail('Exception should have been thrown')
        } catch (exception) {
            // Exception should be thrown
        }

    })

    it("test plagiarismdetector where t2 is undefined", () => {
        try {
            let t1 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sandra", "Sandra", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Saugus", "Saugus", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("sucks.", "sucks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))

            let plag = new PlagiarismDetector(t1, undefined, 4, 12)
            fail('Exception should have been thrown')
        } catch (exception) {
            // Exception should be thrown
        }

    })

    it("test plagiarismdetector where minLength is undefined", () => {
        try {
            let t1 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sandra", "Sandra", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Saugus", "Saugus", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("sucks.", "sucks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))
            let t2 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sandra", "Sandra", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Saugus", "Saugus", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("sucks.", "sucks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))

            let plag = new PlagiarismDetector(t1, t2, undefined, 12)
            fail('Exception should have been thrown')
        } catch (exception) {
            // Exception should be thrown
        }

    })

    it("test plagiarismdetector where initial search length (initLength) is undefined", () => {
        try {
            let t1 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sandra", "Sandra", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Saugus", "Saugus", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("sucks.", "sucks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))
            let t2 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sandra", "Sandra", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Saugus", "Saugus", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("sucks.", "sucks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))

            let plag = new PlagiarismDetector(t1, t2, 4, undefined)
            fail('Exception should have been thrown')
        } catch (exception) {
            // Exception should be thrown
        }

    })

    it("test plagiarismdetector where minLength is greater than the length of t1 (but not t2)", () => {
        try {
            let t1 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sandra", "Sandra", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Saugus", "Saugus", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("sucks.", "sucks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))
            let t2 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sandra", "Sandra", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Saugus", "Saugus", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("sucks.", "sucks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))

            let plag = new PlagiarismDetector(t1, t2, 13, 8)
            fail('Exception should have been thrown')
        } catch (exception) {
            // Exception should be thrown
        }

    })

    it("test plagiarismdetector where minLength is greater than the length of t2 (but not t1)", () => {
        try {
            let t1 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sandra", "Sandra", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Saugus", "Saugus", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("sucks.", "sucks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))
            let t2 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sandra", "Sandra", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Saugus", "Saugus", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("sucks.", "sucks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))

            let plag = new PlagiarismDetector(t1, t2, 13, 8)
            fail('Exception should have been thrown')
        } catch (exception) {
            // Exception should be thrown
        }

    })

    it("test plagiarismdetector where minLength is 0", () => {
        try {
            let t1 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sandra", "Sandra", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Saugus", "Saugus", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("sucks.", "sucks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))
            let t2 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sandra", "Sandra", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Saugus", "Saugus", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("sucks.", "sucks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))

            let plag = new PlagiarismDetector(t1, t2, 0, 8)
            fail('Exception should have been thrown')
        } catch (exception) {
            // Exception should be thrown
        }

    })

    it("test plagiarismdetector where minLength is negative", () => {
        try {
            let t1 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sandra", "Sandra", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Saugus", "Saugus", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("sucks.", "sucks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))
            let t2 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sandra", "Sandra", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Saugus", "Saugus", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("sucks.", "sucks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))

            let plag = new PlagiarismDetector(t1, t2, -10, 8)
            fail('Exception should have been thrown')
        } catch (exception) {
            // Exception should be thrown
        }

    })

    it("test plagiarismdetector where initLength is 0", () => {
        try {
            let t1 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sandra", "Sandra", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Saugus", "Saugus", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("sucks.", "sucks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))
            let t2 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sandra", "Sandra", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Saugus", "Saugus", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("sucks.", "sucks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))

            let plag = new PlagiarismDetector(t1, t2, 3, 0)
            fail('Exception should have been thrown')
        } catch (exception) {
            // Exception should be thrown
        }

    })

    it("test plagiarismdetector where initLength is negative", () => {
        try {
            let t1 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sandra", "Sandra", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Saugus", "Saugus", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("sucks.", "sucks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))
            let t2 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sandra", "Sandra", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Saugus", "Saugus", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("sucks.", "sucks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))

            let plag = new PlagiarismDetector(t1, t2, 3, -19)
            fail('Exception should have been thrown')
        } catch (exception) {
            // Exception should be thrown
        }

    })

    it("test plagiarismdetector where initLength is greater than the length of t1 (but not t2)", () => {
        try {
            let t1 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sandra", "Sandra", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Saugus", "Saugus", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("sucks.", "sucks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))
            let t2 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sandra", "Sandra", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Saugus", "Saugus", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("sucks.", "sucks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))

            let plag = new PlagiarismDetector(t1, t2, 2, 13)
            fail('Exception should have been thrown')
        } catch (exception) {
            // Exception should be thrown
        }

    })

    it("test plagiarismdetector where initLength is greater than the length of t2 (but not t1)", () => {
        try {
            let t1 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sandra", "Sandra", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Saugus", "Saugus", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("sucks.", "sucks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))
            let t2 = new TokenManager([new Token("hello", "hello", [0,0]), new Token("world", "world", [0,0]), 
            new Token("my", "my", [0,0]), new Token("name", "name", [0,0]), new Token("is", "is", [0,0]), 
            new Token("Sandra", "Sandra", [0,0]), new Token("and", "and", [0,0]), new Token("I", "I", [0,0]), 
            new Token("live", "live", [0,0]), new Token("in", "in", [0,0]), new Token("Saugus", "Saugus", [0,0]), 
            new Token("because", "because", [0,0]), new Token("it", "it", [0,0]), new Token("sucks.", "sucks", [0,0])], new Project(['./src/test_submissions/Submission4.ts']))

            let plag = new PlagiarismDetector(t1, t2, 3, 13)
            fail('Exception should have been thrown')
        } catch (exception) {
            // Exception should be thrown
        }

    })
})
