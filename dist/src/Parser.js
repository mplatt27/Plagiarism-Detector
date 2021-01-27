"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("./Token");
const TokenManager_1 = require("./TokenManager");
class Parser {
    // takes in a submission
    constructor(s) {
        this.submission = s;
        this.tokenizedSubmission = this.parseSubmission(s);
    }
    getTokenManager() {
        return this.tokenizedSubmission;
    }
    getSubmission() {
        return this.submission;
    }
    /**
     * Break down the text contained in a submission into an array of tokens.
     * These tokens are held by a TokenManager which is returned at the end
     * of the method
     *
     * @param s the submission being parsed
     */
    parseSubmission(s) {
        // define the parser (babel) and the abstract syntax tree generated
        // from parsing the submission
        const babel = require("@babel/core");
        const ast = babel.parse(s.getSubmission);
        // define iterating variable
        let i = 0;
        // define empty arrays for storing individual strings and tokens.
        // The array of strings is used to generate the array of tokens
        //let myStrings : Array<string> = []
        let myTokens = [];
        // myOriginalText = original strings from submission
        // myTypes = the type of expression of each string (e.g. NumericLiteral)
        let myOriginalText = [];
        let myTypes = [];
        // the parser traverses through the abstract syntax tree and adds
        // any strings that it passes through to the array of strings
        babel.traverse(ast, {
            enter(path) {
                myTypes.push(path.node.type);
                myOriginalText.push(path.node.name);
            }
        });
        // each string in the array of strings is used to create a new
        // token, which is then added to the array of tokens
        for (i = 0; i < myOriginalText.length; i++) {
            myTokens.push(new Token_1.default(myOriginalText[i], myTypes[i]));
        }
        // create a TokenManager that holds the array of tokens
        let myTokenManager = new TokenManager_1.default(myTokens);
        // return the TokenManager which holds all of the tokens generated
        // by the strings extracted from the original submission
        return myTokenManager;
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