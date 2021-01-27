"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
class TokenManager {
    //private tokenizedList: Array<IToken>
    constructor(tokenizedList) {
        this.tokenizedList = tokenizedList;
        if (tokenizedList == undefined) {
            throw console_1.exception("TokenizedList can NOT be undefined");
        }
    }
    // mark a token with a boolean representing whether or not the token contains a match between the two submissions
    markToken(index) {
        this.tokenizedList[index].markToken();
    }
    getNextMarked(index) {
        for (let i = index + 1; i < this.tokenizedList.length; i++) {
            if (this.tokenizedList[i].isMarked()) {
                return i;
            }
        }
        return undefined;
    }
    getNextUnmarked(index) {
        for (let i = index + 1; i < this.tokenizedList.length; i++) {
            if (!this.tokenizedList[i].isMarked()) {
                return i;
            }
        }
        return undefined;
    }
    getTokenizedList() {
        return this.tokenizedList;
    }
    getTokenizedString(startIndex, endIndex) {
        if (startIndex == undefined || endIndex == undefined) {
            throw console_1.exception("Input indices must not be undefined");
        }
        let toString = ""; // initialize substring and get first token in the list. i.e. "hello"
        for (let i = startIndex; i < endIndex + 1; i++) {
            toString = toString + this.tokenizedList[i].getOriginalText(); // searchLength 8, toString = "helloworldmynameisMelanieandI"
        }
        return toString;
    }
}
exports.default = TokenManager;
//# sourceMappingURL=TokenManager.js.map