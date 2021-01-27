"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
const MaxMatchesIterator_1 = require("./MaxMatchesIterator");
// Notes from Melanie 10/28: Reading the paper with the original pseudo code, it says MaximalMatches is intended
// to be a doubly linked list of queues. Each queue records the matches found at a single length. The nodes (queues)
// are arranged in order of decreasing match length. We may want to rework this to fit thsi format? Example:
// First node: Queue for matches of length 6 [Match1, Match2, Match3]
// Second node: Queue for matches of length 5 [Match1]
// Third node: Queue for matches of length 4 [Match1, Match2, Match3, Match4]
// ...
// From book: 
// "The structure used to record the maximal matches is a doubly-linked-list of queues, where each queue records
// maximal-matches of the same length and the list of queues is ordered by decreasing length. A pointer is also
// kept to the queue onto which the most recent maximal-match was appended because there is a high probability
// that the next maximal-match will be similar in length to the last and therefore will be appended to the same
// queue or one that is close by."
class MaximalMatches {
    constructor() {
        // match begins at in the first submission, the index that the match 
        // begins at in the second submission, and the length of the match
        this.mostRecentlyAdded = null;
        this.matches = new Array(); // Initialize 2d array of matches.
    }
    find(startIndex) {
        if (startIndex == undefined) {
            throw console_1.exception("Match object can not be undefined");
        }
        for (let i = 0; i < this.matches.length; i++) { // Iterate through outer array of arrays.
            if (this.matches[i] == undefined) {
                continue;
            }
            else {
                for (let j = 0; j < this.matches[i].length; j++) { // Iterate through inner arrays of IMatches.
                    if (this.matches[i][j].getStartIndex1() == startIndex || this.matches[i][j].getStartIndex2() == startIndex) { // Check if each IMatch has the given starting index.
                        return this.matches[i][j]; // If so, return that IMatch.
                    }
                }
            }
        }
        return undefined; // A matching with given starting index not found, so return null.
    }
    remove(match) {
        if (match == undefined) {
            throw console_1.exception("Match object can not be undefined");
        }
        for (let i = 0; i < this.matches.length; i++) { // Iterate through outer array of arrays.
            if (this.matches[i] == undefined) {
                continue;
            }
            else {
                for (let j = 0; j < this.matches[i].length; j++) { // Iterate through inner arrays of IMatches.
                    if (this.matches[i][j].getStartIndex1() == match.getStartIndex1()) {
                        this.matches[i] = this.matches[i].filter(function (item) { return item.getStartIndex1() != match.getStartIndex1(); });
                        return 1;
                    }
                }
            }
        }
        return -1;
    }
    add(match) {
        if (match == undefined) {
            throw console_1.exception("Match object can not be undefined");
        }
        let i = match.getLength(); // Length of the match
        if (this.matches[i] == undefined) {
            this.matches[i] = new Array();
        }
        this.matches[i].push(match); // Push the match onto the ith array within this.matches
        this.mostRecentlyAdded = match;
    }
    getMaximalMatches() {
        return this.matches;
    }
    createIterator() {
        return new MaxMatchesIterator_1.default(this);
    }
}
exports.default = MaximalMatches;
//# sourceMappingURL=MaximalMatches.js.map