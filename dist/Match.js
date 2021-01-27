"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Match {
    // private index1: number // the index that the match begins at in the first submission
    // private index2: number // the index that the match begins at in the second submission
    // private length: number // the length of the match in terms of number of characters
    constructor(index1, index2, length) {
        this.index1 = index1;
        this.index2 = index2;
        this.length = length;
    }
    getIndex1() {
        return this.index1;
    }
    getIndex2() {
        return this.index2;
    }
    getLength() {
        return this.length;
    }
}
//# sourceMappingURL=Match.js.map