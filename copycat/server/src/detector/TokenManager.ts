import {ITokenManager} from './ITokenManager'
import {IToken} from './IToken'
import { exception } from 'console'
import IProject from './IProject'

/**
 * The TokenManager class represents a TokenManager that contains
 * a list of ITokens and tracks the state of each one.
 */

class TokenManager implements ITokenManager {

    /**
     * Create a new TokenManager object.
     * 
     * @param tokenizedList the list of ITokens to be held by the TokenManager
     * @param project the project to be held by the TokenManager
     */

    constructor(private tokenizedList : Array<IToken>, private project : IProject) {
        if (tokenizedList == undefined) {
            throw exception("TokenizedList can NOT be undefined")
        }
    }

    /**
     * Set the state of the Token at the given index as marked.
     * 
     * @param index the starting index of the Token's original text
     *              in the submission
     */

    markToken(index : number) : void { 
        this.tokenizedList[index].markToken()
    }

    /**
     * Return the index of the next marked token in this TokenManager after the given index (exclusive).
     * 
     * @param index the starting index of the Token's original text
     *              in the submission of which the next marked token
     *              will be returned
     */

    getNextMarked(index : number) : number { // index passed in will always be unmarked
        for (let i = index + 1 ; i < this.tokenizedList.length ; i++) {
            if (this.tokenizedList[i].isMarked()) {
                return i
            }
        }
        return undefined
    }

    /**
     * Return the index of the next unmarked token in this TokenManager after the given index (inclusive).
     * 
     * @param index the starting index of the Token's original text
     *              in the submission of which the next unmarked token
     *              will be returned
     */

    getNextUnmarked(index : number) : number {
        for (let i = index ; i < this.tokenizedList.length ; i++) {
            if (!this.tokenizedList[i].isMarked()) {
                return i
            }
        }
        return undefined
    }

    /**
     * Return the array of ITokens which was used to construct this TokenManager object.
     */

    getTokenizedList() : Array<IToken> {
        return this.tokenizedList
    }

    /**
     * Return the tokenized text of a series of consecutive Tokens (inclusive) as a single
     * conjoined string.
     * 
     * @param startIndex the starting index of the text to be returned in the submission
     * @param endIndex the ending index of the text to be returned in the submission
     */

    getTokenizedString(startIndex : number, endIndex : number) : string {
        if (startIndex == undefined || endIndex == undefined) {
            throw exception("Input indices must not be undefined!")
        }

        let toString : string = "" // initialize substring and get first token in the list 

        for (let i : number = startIndex ; i < endIndex + 1 ; i++) {
            if (endIndex >= this.tokenizedList.length) {
                break
            }

            toString = toString + this.tokenizedList[i].getTokenizedText()
        }

        return toString
    }

    /**
     * Return the project held by the TokenManager.
     */

    getProject() : IProject {
        return this.project
    }
}

export default TokenManager