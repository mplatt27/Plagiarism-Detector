import {IMatch} from './IMatch'
import { exception } from 'console'

/**
 * Match class implements Imatch. represents a detected pattern between what is being compared. 
 * It holds the start index of the first token that matches
 * in each of the corresponding TokenManager lists, as well as the length of the match.
 */
class Match implements IMatch {

    constructor(private startIndex1 : number, private startIndex2 : number, private length : number) {
        if (startIndex1 == null || startIndex2 == null || length == null) {
            throw exception("Cannot pass in a null value")
        }
        if (startIndex1 < 0 || startIndex2 < 0 || length <= 0) {
            throw exception("Input parameter cannot be negative")
        }
    }

    /**
     * Returns the start index of the match found in the first TokenManager.
     */
    getStartIndex1(): number {
        return this.startIndex1
    }

    /**
     * Returns the start index of the match found in the second TokenManager.
     */
    getStartIndex2(): number { 
        return this.startIndex2
    }

    /**
     * Returns the length (number of Tokens) for the Match.
     */
    getLength(): number {
        return this.length
    }
    
}

export default Match