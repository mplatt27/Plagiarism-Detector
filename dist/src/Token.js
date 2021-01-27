"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
class Token {
    // private tokenizedText: string
    // private originalText: String
    constructor(originalText, tokenizedText) {
        this.originalText = originalText;
        this.tokenizedText = tokenizedText;
        if (originalText == undefined || originalText == "" || tokenizedText == undefined || tokenizedText == "") {
            throw console_1.exception("Token's text can not be null or empty");
        }
        this.marked = false; // Initialiiy starts out as false
    }
    getTokenizedText() {
        return this.tokenizedText;
    }
    getOriginalText() {
        return this.originalText;
    }
    // obtain a boolean representing if the token specified as the input parameter contains a match between the two 
    // submissions (true if the token contains a match, false if it does not)
    isMarked() {
        return this.marked;
    }
    markToken() {
        this.marked = true;
    }
}
exports.default = Token;
//# sourceMappingURL=Token.js.map