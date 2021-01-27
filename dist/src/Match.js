"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
class Match {
    // private index1: number // the index that the match begins at in the first submission
    // private index2: number // the index that the match begins at in the second submission
    // private length: number // the length of the match in terms of number of characters
    constructor(startIndex1, startIndex2, length) {
        this.startIndex1 = startIndex1;
        this.startIndex2 = startIndex2;
        this.length = length;
        if (startIndex1 == null || startIndex2 == null || length == null) {
            throw console_1.exception("Cannot pass in a null value");
        }
        if (startIndex1 < 0 || startIndex2 < 0 || length <= 0) {
            throw console_1.exception("Input parameter cannot be negative");
        }
    }
    getStartIndex1() {
        return this.startIndex1;
    }
    getStartIndex2() {
        return this.startIndex2;
    }
    getLength() {
        return this.length;
    }
}
exports.default = Match;
//# sourceMappingURL=Match.js.map