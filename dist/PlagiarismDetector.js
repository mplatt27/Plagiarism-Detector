"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parser_1 = require("./Parser");
const MaximalMatches_1 = require("./MaximalMatches");
class PlagiarismDetector {
    // private submission1: ISubmission // the Submission object that represents the first submission
    // private submission2: ISubmission // the Submission object that represents the second submission
    // private parser1: IParser
    // private parser2: IParser
    constructor(sub1, sub2, minLength, initLength) {
        this.sub1 = sub1;
        this.sub2 = sub2;
        this.minLength = minLength;
        this.initLength = initLength;
        let parser1 = new Parser_1.default(sub1);
        let parser2 = new Parser_1.default(sub2);
        this.tokenManager1 = parser1.getTokenManager();
        this.tokenManager2 = parser2.getTokenManager();
    }
    rkr_gst() {
        let t1 = this.tokenManager1;
        let t2 = this.tokenManager2;
        let searchLength = this.initLength;
        let stop = false;
        while (!stop) { //repeatedly check string matching until it reaches minLength (the minimum search length)
            let maximalMatches = new MaximalMatches_1.default();
            let longestMaximalMatch = this.scanPattern(maximalMatches, t1, t2, searchLength); //check strings, get longest match
            if (longestMaximalMatch > 2 * searchLength) { // if the longest found match is greater than twice the search length
                searchLength = longestMaximalMatch;
            }
            else {
                this.markStrings(maximalMatches, t1, t2); // create tiles from matches
                if (searchLength > 2 * this.minLength) {
                    searchLength = searchLength / 2;
                }
                else if (searchLength > this.minLength) {
                    searchLength = this.minLength;
                }
                else { // end loop when the search length is equal to the minimum length
                    stop = true;
                }
            }
        }
        // ...
        // mm = new MaximalMatches()
        // number num1 = scanPattern(mm)
        // markStrings(mm)
        // ...
    }
    getInitialSearchLength() {
        return this.initLength;
    }
    getMinimalMatchLength() {
        return this.minLength;
    }
    finalOutput() {
        return null;
    }
    markStrings(max, t1, t2) {
        return null;
    }
    scanPattern(max, t1, t2, searchLength) {
        let hashT = new Hashtable();
        let index_next_unmarked = let, listOfTokens = [];
        let token1 = t1.getTokenizedList[index1]();
        let token2 = t1.getTokenizedList[index2]();
        listOfTokens.add(token1);
        listOfTokens.add(token2);
        let h1 = new Hashtable();
        h1.createHash(listOfTokens);
        // ...
        // m1 = new Match(index1, index2, length)
        // maxMatches.add(m1)
        return null;
    }
}
//# sourceMappingURL=PlagiarismDetector.js.map