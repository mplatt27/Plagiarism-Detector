"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Parser {
    // takes in a submission
    constructor(s) { }
    getTokenManager() {
        throw new Error('Method not implemented.');
    }
    getSubmission() {
        return null;
    }
    getTokenizedSubmission() {
        return null;
    }
    parse(s) {
        // t1 = new Token(originaltext1: String, identifier1: String)
        // t2 = new Token(originaltext2: String, identifier2: String)
        // ...
        // tokenList = new List<Token>
        // tokenList.add(t1)
        // tokenList.add(t2)
        // ...
        // tmanager = new TokenManager(tokenList)
        // this.tokenizedSubmission = tmanager
    }
}
exports.default = Parser;
//# sourceMappingURL=Parser.js.map