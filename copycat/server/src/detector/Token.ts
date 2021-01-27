import {IToken} from './IToken'
import { exception } from 'console'

/**
 * The Token class represents a Token object that contains both the Token's original text and
 * it's tokenized text, which are both used to create the object.  Tokens always start out unmarked,
 * but they can later be marked.  The Token stores it's marked or unmarked state as a boolean value.
 */

class Token implements IToken {
    private marked : boolean // true if the text contained in the Token object is the same between the two submissions, false otherwise

    /**
     * Create a new Token object representing a single Token.
     * 
     * @param originalText the text of the token as a string
     * @param tokenizedText the AST node type of token (e.g. declarative, identifier, etc.)
     * @param range the range of indices of the token's original text in the submission
     */

    constructor(private originalText : string, private tokenizedText : string, private range : Array<number>) {
        if (originalText == undefined || tokenizedText == undefined) {
            throw exception("Token's text can not be null or empty")
        }
        this.marked = false
    }

    /**
     * Obtain the range of indices representing where the Token lies in the submission
     * as an array of numbers.
     */

    getRange() : Array<number> {
        return this.range
    }

    /**
     * Return the tokenized text that was used to construct the Token.
     */

    getTokenizedText() : string {
        return this.tokenizedText
    }

    /**
     * Return the original text that was used to construct the Token.
     */

    getOriginalText() : string {
        return this.originalText
    }

    /**
     * Return a boolean value indicating whether or not the Token is marked.  Return
     * true if it is marked, false otherwise.
     */

    isMarked() : boolean {
        return this.marked
    }

    /**
     * Set the state of the Token as having been marked.
     */

    markToken() : void {
        this.marked = true
    }
}

export default Token