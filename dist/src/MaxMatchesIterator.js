"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// In MaximalMatches we need to make a method createIterator() : return new MaxMatchesIterator(this)
class MaxMatchesIterator {
    constructor(m) {
        this.matches = m.getMaximalMatches(); // need to add method to get list
    }
    first() {
        this.queueCount = 0;
    }
    next() {
        this.queueCount++;
    }
    isDone() {
        return this.queueCount == this.matches.length;
    }
    current() {
        return this.matches[this.queueCount];
    }
}
exports.default = MaxMatchesIterator;
//# sourceMappingURL=MaxMatchesIterator.js.map