/**
 * The IToken interface represents a Token object that contains both the Token's original text and
 * it's tokenized text, which are both used to create the object.  Tokens always start out unmarked,
 * but they can later be marked.  The Token stores it's marked or unmarked state as a boolean value.
 */

export interface IToken {

    /**
     * Return the tokenized text that was used to construct the Token.
     */

    getTokenizedText() : string

    /**
     * Return the original text that was used to construct the Token.
     */

    getOriginalText() : string

    /**
     * Return a boolean value indicating whether or not the Token is marked.  Return
     * true if it is marked, false otherwise.
     */

    isMarked() : boolean

    /**
     * Set the state of the Token as having been marked.
     */

    markToken() : void

    /**
     * Obtain the range of indices representing where the Token lies in the submission
     * as an array of numbers.
     */

    getRange() : Array<number>
}