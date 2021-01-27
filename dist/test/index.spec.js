"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const Submission_1 = require("../src/Submission");
const Match_1 = require("../src/Match");
const MaximalMatches_1 = require("../src/MaximalMatches");
const Token_1 = require("../src/Token");
const TokenManager_1 = require("../src/TokenManager");
const assert_1 = require("assert");
mocha_1.describe("Tests for Submission class", () => {
    it("Create Submission for submission1", () => {
        try {
            let sub1 = new Submission_1.default('./src/Submission1.txt');
            chai_1.expect(sub1.getSubmission()).to.equal("Hello world my name is Melanie and I live in NH.");
        }
        catch (exception) {
            assert_1.fail("Exception should NOT have been thrown");
        }
    });
    it("Create Submission for submission2", () => {
        try {
            let sub2 = new Submission_1.default('./src/Submission2.txt');
            chai_1.expect(sub2.getSubmission()).to.equal("Hi folks my name is Melanie and I come from NH.");
        }
        catch (exception) {
            assert_1.fail("Exception should NOT have been thrown");
        }
    });
    it("Create Submission for a ts file", () => {
        try {
            let sub3 = new Submission_1.default('./src/Submission3.ts');
            chai_1.expect(sub3.getSubmission()).to.equal("class MartianClass { // Represents a martian with a name."
                + "\n    private name : string; // Name of the Martian."
                + "\n\n    public constructor(name: string) { // Construct a MartianClass"
                + "\n        this.name = name;"
                + "\n    }"
                + "\n\n    public getName() { // Helper to get name. Returns a string."
                + "\n        return this.name"
                + "\n    }"
                + "\n}");
        }
        catch (exception) {
            assert_1.fail("Exception should NOT have been thrown");
        }
    });
    it("Catch null value given to constructor", () => {
        try {
            let sub = new Submission_1.default(null);
            assert_1.fail("Exception should have been thrown");
        }
        catch (exception) {
            // Exception should be thrown.
        }
    });
    it("Catch empty string given to constructor", () => {
        try {
            let sub = new Submission_1.default("");
            assert_1.fail("Exception should have been thrown");
        }
        catch (exception) {
            // Exception should be thrown.
        }
    });
    it("Catch nonexistent file name into constructor", () => {
        try {
            let sub = new Submission_1.default("./Ravenclaw.ts");
            assert_1.fail("Exception should have been thrown");
        }
        catch (exception) {
            // Exception should be thrown.
        }
    });
});
mocha_1.describe("Tests for Match class", () => {
    it("Create and check methods on basic Match", () => {
        try {
            let match = new Match_1.default(2, 4, 2);
            chai_1.expect(match.getStartIndex1()).to.equal(2);
            chai_1.expect(match.getStartIndex2()).to.equal(4);
            chai_1.expect(match.getLength()).to.equal(2);
        }
        catch (exception) {
            assert_1.fail("Exception should NOT have been thrown");
        }
    });
    it("Catch constructor exception for null index1", () => {
        try {
            let match = new Match_1.default(null, 4, 3);
            assert_1.fail("Exception should have been thrown");
        }
        catch (exception) {
            // Exception should be thrown.
        }
    });
    it("Catch constructor exception for null index2", () => {
        try {
            let match = new Match_1.default(2, null, 3);
            assert_1.fail("Exception should have been thrown");
        }
        catch (exception) {
            // Exception should be thrown.
        }
    });
    it("Catch constructor exception for null length", () => {
        try {
            let match = new Match_1.default(2, 4, null);
            assert_1.fail("Exception should have been thrown");
        }
        catch (exception) {
            // Exception should be thrown.
        }
    });
    it("Catch constructor exception for negative index1", () => {
        try {
            let match = new Match_1.default(-2, 4, 4);
            assert_1.fail("Exception should have been thrown");
        }
        catch (exception) {
            // Exception should be thrown.
        }
    });
    it("Catch constructor exception for negative index2", () => {
        try {
            let match = new Match_1.default(2, -4, 6);
            assert_1.fail("Exception should have been thrown");
        }
        catch (exception) {
            // Exception should be thrown.
        }
    });
    it("Catch constructor exception for negative length", () => {
        try {
            let match = new Match_1.default(2, 4, -2);
            assert_1.fail("Exception should have been thrown");
        }
        catch (exception) {
            // Exception should be thrown.
        }
    });
    it("Catch constructor exception for length 0", () => {
        try {
            let match = new Match_1.default(1, 1, 0);
            assert_1.fail("Exception should have been thrown");
        }
        catch (exception) {
            // Exception should be thrown.
        }
    });
});
mocha_1.describe("Tests for MaximalMatch class", () => {
    it("Test can find() Match add()-ed to MaximalMatch by input of Matches index1", () => {
        try {
            let m1 = new Match_1.default(0, 2, 5);
            let mm = new MaximalMatches_1.default();
            mm.add(m1);
            chai_1.expect(mm.find(0).getStartIndex1()).to.equal(0);
            chai_1.expect(mm.find(0).getStartIndex2()).to.equal(2);
            chai_1.expect(mm.find(0).getLength()).to.equal(5);
        }
        catch (exception) {
            assert_1.fail("Exception should NOT have been thrown");
        }
    });
    it("Test can find() Match add()-ed to MaximalMatch by input of Matches index2", () => {
        try {
            let m1 = new Match_1.default(0, 2, 5);
            let mm = new MaximalMatches_1.default();
            mm.add(m1);
            chai_1.expect(mm.find(2).getStartIndex1()).to.equal(0);
            chai_1.expect(mm.find(2).getStartIndex2()).to.equal(2);
            chai_1.expect(mm.find(2).getLength()).to.equal(5);
        }
        catch (exception) {
            assert_1.fail("Exception should NOT have been thrown");
        }
    });
    it("Test can add() multiple Matches of different lengths and find() them in MaximalMatches", () => {
        try {
            let m1 = new Match_1.default(0, 2, 5);
            let m2 = new Match_1.default(4, 8, 11);
            let m3 = new Match_1.default(1, 13, 1);
            let mm = new MaximalMatches_1.default();
            mm.add(m1);
            mm.add(m2);
            mm.add(m3);
            chai_1.expect(mm.find(0).getStartIndex1()).to.equal(0);
            chai_1.expect(mm.find(2).getStartIndex2()).to.equal(2);
            chai_1.expect(mm.find(4).getStartIndex1()).to.equal(4);
            chai_1.expect(mm.find(8).getStartIndex2()).to.equal(8);
            chai_1.expect(mm.find(1).getStartIndex1()).to.equal(1);
            chai_1.expect(mm.find(13).getStartIndex2()).to.equal(13);
        }
        catch (exception) {
            assert_1.fail("Exception should NOT have been thrown");
        }
    });
    it("Test can add() multiple Matches of the same length and find() them in MaximalMatches", () => {
        try {
            let m1 = new Match_1.default(0, 2, 5);
            let m2 = new Match_1.default(4, 8, 5);
            let m3 = new Match_1.default(1, 13, 5);
            let mm = new MaximalMatches_1.default();
            mm.add(m1);
            mm.add(m2);
            mm.add(m3);
            chai_1.expect(mm.find(0).getStartIndex1()).to.equal(0);
            chai_1.expect(mm.find(2).getStartIndex2()).to.equal(2);
            chai_1.expect(mm.find(4).getStartIndex1()).to.equal(4);
            chai_1.expect(mm.find(8).getStartIndex2()).to.equal(8);
            chai_1.expect(mm.find(1).getStartIndex1()).to.equal(1);
            chai_1.expect(mm.find(13).getStartIndex2()).to.equal(13);
        }
        catch (exception) {
            assert_1.fail("Exception should NOT have been thrown");
        }
    });
    it("Test find() method returns undefined for empty MaximalMatches", () => {
        try {
            let mm = new MaximalMatches_1.default();
            chai_1.expect(mm.find(4)).to.equal(undefined);
        }
        catch (exception) {
            assert_1.fail("Exception should NOT have been thrown");
        }
    });
    it("Test find() method returns undefined for nonexistent Match in MaximalMatches", () => {
        try {
            let m1 = new Match_1.default(0, 4, 8);
            let mm = new MaximalMatches_1.default();
            mm.add(m1);
            chai_1.expect(mm.find(11)).to.equal(undefined);
        }
        catch (exception) {
            assert_1.fail("Exception should NOT have been thrown");
        }
    });
    it("Test can remove() a Match from MaximalMatches leaving other Matches of different lengths unchanged", () => {
        try {
            let m1 = new Match_1.default(0, 2, 5);
            let m2 = new Match_1.default(4, 8, 4);
            let m3 = new Match_1.default(1, 13, 3);
            let mm = new MaximalMatches_1.default();
            mm.add(m1);
            mm.add(m2);
            mm.add(m3);
            chai_1.expect(mm.find(0).getStartIndex1()).to.equal(0);
            chai_1.expect(mm.find(2).getStartIndex2()).to.equal(2);
            chai_1.expect(mm.remove(m1)).to.equal(1);
            chai_1.expect(mm.find(0)).to.equal(undefined);
            chai_1.expect(mm.find(2)).to.equal(undefined);
        }
        catch (exception) {
            assert_1.fail("Exception should NOT have been thrown");
        }
    });
    it("Test can remove() a Match from MaximalMatches leaving other Matches of same length unchanged", () => {
        try {
            let m1 = new Match_1.default(0, 2, 5);
            let m2 = new Match_1.default(4, 8, 5);
            let m3 = new Match_1.default(1, 13, 5);
            let mm = new MaximalMatches_1.default();
            mm.add(m1);
            mm.add(m2);
            mm.add(m3);
            chai_1.expect(mm.remove(m1)).to.equal(1);
            chai_1.expect(mm.find(0)).to.equal(undefined);
            chai_1.expect(mm.find(2)).to.equal(undefined);
            chai_1.expect(mm.find(4).getStartIndex1()).to.equal(4);
            chai_1.expect(mm.find(8).getStartIndex2()).to.equal(8);
            chai_1.expect(mm.find(1).getStartIndex1()).to.equal(1);
            chai_1.expect(mm.find(13).getStartIndex2()).to.equal(13);
        }
        catch (exception) {
            assert_1.fail("Exception should NOT have been thrown");
        }
    });
    it("Test attempting to remove() a nonexistent Match from MaximalMatches returns -1", () => {
        try {
            let m1 = new Match_1.default(0, 2, 5);
            let m2 = new Match_1.default(4, 8, 5);
            let m3 = new Match_1.default(1, 13, 5);
            let mm = new MaximalMatches_1.default();
            mm.add(m1);
            mm.add(m2);
            mm.add(m3);
            chai_1.expect(mm.remove(new Match_1.default(10, 10, 9))).to.equal(-1);
        }
        catch (exception) {
            assert_1.fail("Exception should NOT have been thrown");
        }
    });
    it("Test attempting to remove() a nonexistent Match from an empty MaximalMatches return -1", () => {
        try {
            let mm = new MaximalMatches_1.default();
            chai_1.expect(mm.remove(new Match_1.default(10, 10, 9))).to.equal(-1);
        }
        catch (exception) {
            assert_1.fail("Exception should NOT have been thrown");
        }
    });
    it("Catch exception for attempting to add() an undefined Match", () => {
        try {
            let mm = new MaximalMatches_1.default();
            mm.add(undefined);
            assert_1.fail("Exception should have been thrown");
        }
        catch (exception) {
            // Exception should be thrown
        }
    });
    it("Catch exception for attempting to remove() an undefined Match", () => {
        try {
            let mm = new MaximalMatches_1.default();
            mm.add(new Match_1.default(1, 4, 2));
            mm.remove(undefined);
            assert_1.fail("Exception should have been thrown");
        }
        catch (exception) {
            // Exception should be thrown
        }
    });
    it("Catch exception for attempting to find() an undefined Match", () => {
        try {
            let mm = new MaximalMatches_1.default();
            mm.find(undefined);
            assert_1.fail("Exception should have been thrown");
        }
        catch (exception) {
            // Exception should be thrown
        }
    });
});
mocha_1.describe("Tests for Token class", () => {
    it("Create new Token object", () => {
        try {
            let tok1 = new Token_1.default("They did the monster mash. It was a graveyard smash.");
            chai_1.expect(tok1.getOriginalText()).to.equal("They did the monster mash. It was a graveyard smash.");
            chai_1.expect(tok1.isMarked()).to.equal(false);
            // GetTokenizedText()
        }
        catch (exception) {
            assert_1.fail("Exception should NOT have been thrown");
        }
    });
    it("Check that Token isMarked() after being marked", () => {
        //expect(tok1.isMarked()).to.equal(false)
    });
    it("Catch exception for attempting to create a Token will an undefined value", () => {
        try {
            let tok1 = new Token_1.default(undefined);
            assert_1.fail("Exception should have been thrown");
        }
        catch (exception) {
            // Exception should be thrown.
        }
    });
    it("Catch exception for attempting to create a Token will an empty string", () => {
        try {
            let tok1 = new Token_1.default("");
            assert_1.fail("Exception should have been thrown");
        }
        catch (exception) {
            // Exception should be thrown.
        }
    });
});
mocha_1.describe("Tests for TokenManager class", () => {
    it("Create new TokenManager object", () => {
        try {
            let tm = new TokenManager_1.default([new Token_1.default("vampire"), new Token_1.default("ghost"), new Token_1.default("werewolf")]);
        }
        catch (exception) {
            assert_1.fail("Exception should NOT have been thrown");
        }
    });
    it("Catch exception for attempting to create a new TokenManager with an undefined input", () => {
        try {
            let tm = new TokenManager_1.default(undefined);
            assert_1.fail("Exception should have been thrown");
        }
        catch (exception) {
            // Exception should be thrown
        }
    });
    it("Test getTokenizedList() method on TokenManager", () => {
        try {
            let vampire = new Token_1.default("vampire");
            let ghost = new Token_1.default("ghost");
            let werewolf = new Token_1.default("werewolf");
            let list = [vampire, ghost, werewolf];
            let tm = new TokenManager_1.default(list);
            chai_1.expect(tm.getTokenizedList()).to.equal(list);
        }
        catch (exception) {
            assert_1.fail("Exception should NOT have been thrown");
        }
    });
    it("Test getTokenizedString() method on TokenManager for full list of tokens", () => {
        try {
            let vampire = new Token_1.default("vampire");
            let ghost = new Token_1.default("ghost");
            let werewolf = new Token_1.default("werewolf");
            let list = [vampire, ghost, werewolf];
            let tm = new TokenManager_1.default(list);
            chai_1.expect(tm.getTokenizedString(0, 2)).to.equal("vampireghostwerewolf");
        }
        catch (exception) {
            assert_1.fail("Exception should NOT have been thrown");
        }
    });
    it("Test getTokenizedString() method on TokenManager for one token", () => {
        try {
            let vampire = new Token_1.default("vampire");
            let ghost = new Token_1.default("ghost");
            let werewolf = new Token_1.default("werewolf");
            let list = [vampire, ghost, werewolf];
            let tm = new TokenManager_1.default(list);
            chai_1.expect(tm.getTokenizedString(1, 1)).to.equal("ghost");
        }
        catch (exception) {
            assert_1.fail("Exception should NOT have been thrown");
        }
    });
    it("Test getTokenizedString() method on TokenManager for substring of tokens", () => {
        try {
            let vampire = new Token_1.default("vampire");
            let ghost = new Token_1.default("ghost");
            let werewolf = new Token_1.default("werewolf");
            let list = [vampire, ghost, werewolf];
            let tm = new TokenManager_1.default(list);
            chai_1.expect(tm.getTokenizedString(1, 2)).to.equal("ghostwerewolf");
        }
        catch (exception) {
            assert_1.fail("Exception should NOT have been thrown");
        }
    });
    it("Catch exception for getTokenizedString() method on TokenManager with undefined startIndex input", () => {
        try {
            let vampire = new Token_1.default("vampire");
            let ghost = new Token_1.default("ghost");
            let werewolf = new Token_1.default("werewolf");
            let list = [vampire, ghost, werewolf];
            let tm = new TokenManager_1.default(list);
            chai_1.expect(tm.getTokenizedString(undefined, 1)).to.equal("ghost");
            assert_1.fail("Exception should have been thrown");
        }
        catch (exception) {
            // Exception should be thrown
        }
    });
    it("Catch exception for getTokenizedString() method on TokenManager with undefined endIndex input", () => {
        try {
            let vampire = new Token_1.default("vampire");
            let ghost = new Token_1.default("ghost");
            let werewolf = new Token_1.default("werewolf");
            let list = [vampire, ghost, werewolf];
            let tm = new TokenManager_1.default(list);
            chai_1.expect(tm.getTokenizedString(1, undefined)).to.equal("ghost");
            assert_1.fail("Exception should have been thrown");
        }
        catch (exception) {
            // Exception should be thrown
        }
    });
    it("Catch exception for getTokenizedString() method on TokenManager with undefined startIndex and endIndex input", () => {
        try {
            let vampire = new Token_1.default("vampire");
            let ghost = new Token_1.default("ghost");
            let werewolf = new Token_1.default("werewolf");
            let list = [vampire, ghost, werewolf];
            let tm = new TokenManager_1.default(list);
            chai_1.expect(tm.getTokenizedString(undefined, undefined)).to.equal("ghost");
            assert_1.fail("Exception should have been thrown");
        }
        catch (exception) {
            // Exception should be thrown
        }
    });
});
//# sourceMappingURL=index.spec.js.map