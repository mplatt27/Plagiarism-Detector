"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parser_1 = require("./Parser");
const MaximalMatches_1 = require("./MaximalMatches");
const Match_1 = require("./Match");
class PlagiarismDetector {
    constructor(sub1, sub2, minLength, initLength) {
        this.sub1 = sub1;
        this.sub2 = sub2;
        this.minLength = minLength;
        this.initLength = initLength;
        let parser1 = new Parser_1.default(sub1);
        let parser2 = new Parser_1.default(sub2);
        this.t1 = parser1.getTokenManager();
        this.t2 = parser2.getTokenManager();
        this.maxMatches = new MaximalMatches_1.default();
    }
    rkr_gst() {
        //let t1 = this.parser1.getTokenManager()
        //let t2 = this.parser2.getTokenManager()
        let searchLength = this.initLength; // Goes from big to small ?
        let stop = false;
        while (!stop) { //repeatedly check string matching until it reaches minLength (the minimum search length)
            let longestMaximalMatch = this.scanPattern(searchLength); //check strings, get longest match
            if (longestMaximalMatch > 2 * searchLength) { // if the longest found match is greater than twice the search length
                searchLength = longestMaximalMatch;
            }
            else {
                this.markStrings(); // create tiles from matches
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
    markStrings() {
        // create iterator for maximal matches
        let maxMatchesIter = this.maxMatches.createIterator(); // need to create this method in MaximalMatches
        // loop through maximal matches with the iterator
        for (maxMatchesIter.first(); !maxMatchesIter.isDone(); maxMatchesIter.next()) {
            let queue = maxMatchesIter.current();
            if (queue.length == 0) {
                continue;
            }
            else {
                // remove the match from the queue
                let currentMatch = queue.pop();
                // loop through each Match in the queue
                while (queue.length != 0) { // or while currentMatch != undefined
                    // remove the current match from the queue
                    this.maxMatches.remove(currentMatch);
                    // mark each token in the match
                    let t1start = currentMatch.getStartIndex1();
                    let t2start = currentMatch.getStartIndex2();
                    for (var i = 0; i < currentMatch.getLength(); i++) {
                        this.t1.markToken(t1start + i); // change this to take in start index and length
                        this.t2.markToken(t2start + i);
                        // move to the next match in the queue
                        currentMatch = queue.pop();
                    }
                }
            }
        }
    }
    scanPattern(searchLength) {
        let map = new Map();
        let indexNextUnmarked1 = this.t1.getNextUnmarked(0);
        let indexNextUnmarked2 = this.t2.getNextUnmarked(0);
        let maxMatch = 0; // Initialize as empty string. This is what we are looking to fill.
        if (indexNextUnmarked1 != undefined) { // If unmarked tokens exist.
            for (let i = indexNextUnmarked1; i < this.t1.getTokenizedList().length - searchLength; i++) { // Keep iterating through t1, starting at the first unmarked that we found
                if (!this.t1.getTokenizedList()[i].isMarked()) { // If token at index i is unmarked.
                    let nextMarked = this.t1.getNextMarked(i); // Get the next MARKED token in t1.
                    let distToNextTile = 0;
                    if (nextMarked == undefined) { // That means that nothing has been marked yet
                        distToNextTile = searchLength; // We want to look forward by [searchLength] indices]
                    }
                    else { // else there are things ahead that are marked
                        distToNextTile = nextMarked - i; // So we want to look to that next marked tile and must travel
                    }
                    if (distToNextTile < searchLength) { // We want to move our i to the next umarked after our tile so we can call get next unmarked starting at nextmarked
                        i = this.t1.getNextUnmarked(nextMarked) - 1; // sets up i to be at the next marked                     
                    }
                    else { // else it is greater than or equal to  searchlength so we have enough tiles to move through the next iteration of [searchLength]
                        let t1String = this.t1.getTokenizedString(i, i + searchLength);
                        // i to list of indices
                        if (map.has(t1String)) {
                            let list = map.get(t1String);
                            list.push(i);
                            map.delete(t1String); // delete existing and replace below
                            map.set(t1String, list); // Add this entry of token chunks to the hashmap.
                        }
                        else {
                            map.set(t1String, [i]); // else add this substring and corresponding starting index to the map
                        }
                    }
                }
            }
        }
        if (indexNextUnmarked2 != undefined) { // If unmarked tokens exist.
            for (let i = indexNextUnmarked2; i < this.t2.getTokenizedList().length - searchLength; i++) { // Keep iterating through t1, starting at the first unmarked that we found
                if (!this.t2.getTokenizedList()[i].isMarked()) { // If token at index i is unmarked.
                    let nextMarked = this.t2.getNextMarked(i); // Get the next MARKED token in t1.
                    let distToNextTile = 0;
                    if (nextMarked == undefined) { // That means that nothing has been marked yet
                        distToNextTile = searchLength; // We want to look forward by [searchLength] indices]
                    }
                    else { // else there are things ahead that are marked
                        distToNextTile = nextMarked - i; // So we want to look to that next marked tile and must travel
                    }
                    if (distToNextTile < searchLength) { // We want to move our i to the next umarked after our tile so we can call get next unmarked starting at nextmarked
                        i = this.t2.getNextUnmarked(nextMarked) - 1; // sets up i to be at the next marked                     
                    }
                    else { // else it is greater than or equal to  searchlength so we have enough tiles to move through the next iteration of [searchLength]
                        let t2String = this.t2.getTokenizedString(i, i + searchLength);
                        let look = map.get(t2String); // Is this substring already in the hashmap?
                        if (look == undefined) {
                            continue;
                        }
                        else {
                            let k = searchLength;
                            for (let m = 0; m < look.length; m++) {
                                let t1String = this.t1.getTokenizedString(m, m + k);
                                let t2StringUpdated = t2String;
                                while (t1String == t2StringUpdated || k < this.t1.getTokenizedList().length || k < this.t2.getTokenizedList().length) { // As the strings increment in size, while they are still matches (longest possible k)
                                    k = k + 1; // Increment at the beginning of each loop
                                    t1String = this.t1.getTokenizedString(m, m + k); // add next token to the string for Submission1
                                    t2StringUpdated = this.t2.getTokenizedString(i, i + k); // add next token to the string for Submission2
                                    if (this.t1.getTokenizedList()[k].isMarked() || this.t2.getTokenizedList()[k].isMarked()) { // checking if its already part of another match so we dont need to include it here
                                        break; // break from while loop
                                    }
                                }
                                if (k > 2 * searchLength) { // we have found a match that is super long
                                    return k; // early exit, return the super long length
                                }
                                else {
                                    let match = new Match_1.default(m, i, k); // Create new match (startIndexSub1, startIndexSub2, length of match)
                                    this.maxMatches.add(match);
                                }
                                if (k > maxMatch) { // we have found a match bigger than previously recorded
                                    maxMatch = k; // Reassign maxMatch to bigger length
                                }
                            }
                        }
                    }
                }
            }
        }
        return maxMatch;
    }
}
//# sourceMappingURL=PlagiarismDetector.js.map