import IProject from './IProject'
import {IToken} from './IToken'

/**
 * The ITokenManager interface represents a TokenManager that contains
 * a list of ITokens and tracks the state of each one.
 */

export interface ITokenManager {

    /**
     * Set the state of the Token at the given index as marked.
     * 
     * @param index the starting index of the Token's original text
     *              in the submission
     */

    markToken(index : number) : void

    /**
     * Return the index of the next marked token in this TokenManager after the given index (exclusive).
     * 
     * @param index the starting index of the Token's original text
     *              in the submission of which the next marked token
     *              will be returned
     */

    getNextMarked(index : number) : number

    /**
     * Return the index of the next unmarked token in this TokenManager after the given index (inclusive).
     * 
     * @param index the starting index of the Token's original text
     *              in the submission of which the next unmarked token
     *              will be returned
     */

    getNextUnmarked(index : number) : number

    /**
     * Return the array of ITokens which was used to construct this TokenManager object.
     */

    getTokenizedList() : Array<IToken>

    /**
     * Return the tokenized text of a series of consecutive Tokens (inclusive) as a single
     * conjoined string.
     * 
     * @param startIndex the starting index of the text to be returned in the submission
     * @param endIndex the ending index of the text to be returned in the submission
     */

    getTokenizedString(startIndex : number, endIndex : number) : string

    /**
     * Return the project held by the TokenManager.
     */

    getProject() : IProject
}