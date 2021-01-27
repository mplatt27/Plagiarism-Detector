import { IIterator } from "./IIterator"
import { IMatch } from "./IMatch"
import { IMaximalMatches } from "./IMaximalMatches"

/**
 * MaxMatchesIterator class which implements IIterator<Array<IMatch>> iterates through the MaximalMatches
 */
class MaxMatchesIterator implements IIterator<Array<IMatch>> {
    private matches : Array<Array<IMatch>>
    private queueCount : number

    constructor(m : IMaximalMatches) {
        this.matches = m.getMaximalMatches() 
    }

    /**
     * Sets the first element in the Iterator.
     */
    first(): void {
        this.queueCount = 0
    }

    /**
     * Advances to the next element in the Iterator.
     */
    next(): void {
        this.queueCount++
    }

     /**
     * Returns true if the Iterator has reached the end of the list and false otherwise.
     */
    isDone(): boolean {
        return this.queueCount == this.matches.length
    }

     /**
     * Returns the current element that the Iterator is on.
     */
    current(): Array<IMatch> {
        return this.matches[this.queueCount]
    }
    
}

export default MaxMatchesIterator
