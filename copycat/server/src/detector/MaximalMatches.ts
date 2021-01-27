import {IMaximalMatches} from './IMaximalMatches'
import { IMatch } from './IMatch'
import { exception } from 'console'
import MaxMatchesIterator from './MaxMatchesIterator'
import { IIterator } from './IIterator'

/**
 * Interface represents a collection of Matches of Tokens. They are stored in a 2D array 
 * of IMatches, which can be iterated through. The IMatches are separated in their sub 
 * arrays by their length, corresponding to the index of the outer array. Nothing will be
 * stored at the 0th index of the outer array.
 */
class MaximalMatches implements IMaximalMatches { 
    private matches: Array<Array<IMatch>> //an array of array of Match objects, each of which contains the index that the 
                                   // match begins at in the first submission, the index that the match 
                                   // begins at in the second submission, and the length of the match         

    constructor() {
        this.matches = new Array<Array<IMatch>>() // Initialize 2d array of IMatches.
    }
    
    /**
     * Method returns the IMatch object that starts at the given index. If no IMatch exists at 
     * the given index, the method returns undefined.
     * @param startIndex : the start index of the IMatch object
     */
    find(startIndex: number): IMatch { 
        if (startIndex == undefined) {
            throw exception("Match object can not be undefined")
        }
        for (let i = 0; i < this.matches.length; i++) { // Iterate through outer array of arrays.
            if (this.matches[i] == undefined) {
                continue
            } else {
                for (let j = 0; j < this.matches[i].length; j++) { // Iterate through inner arrays of IMatches.
                    if (this.matches[i][j].getStartIndex1() == startIndex || this.matches[i][j].getStartIndex2() == startIndex) { // Check if each IMatch has the given starting index.
                        return this.matches[i][j] // If so, return that IMatch.
                    }
                }
            }    
        }
        return undefined // A matching with given starting index not found, so return undefined.
    }

    /**
     * Removes the given IMatch from the collection of MaximalMatches, returning 1 upon
     * success and -1 upon failure. Will throw an exception if the IMatch passed in is undefined.
     * @param match : IMatch object to be removed
     */
    remove(match: IMatch): number { 
        if (match == undefined) {
            throw exception("Match object can not be undefined")
        }
        for (let i = 0; i < this.matches.length; i++) { // Iterate through outer array of arrays.
            if (this.matches[i] == undefined) {
                continue
            } else {
                for (let j = 0; j < this.matches[i].length; j++) { // Iterate through inner arrays of IMatches.
                    if (this.matches[i][j].getStartIndex1() == match.getStartIndex1()) {
                        this.matches[i] = this.matches[i].filter(function(item) { return item.getStartIndex1() != match.getStartIndex1()})
                        return 1 // Upon success of IMatch removal.
                    }
                }
            }    
        }
        return -1 // Given IMatch was not in this MaximalMatches object.
    }
    
     /**
     * Adds a given IMatch to the collection of MaximalMatches. Will throw an exception 
     * if the IMatch passed in is undefined.
     * @param match : IMatch to be added
     */
    add(match: IMatch): void { 
        if (match == undefined) {
            throw exception("Match object can not be undefined")
        }
        let i = match.getLength() // Length of the match
        if (this.matches[i] == undefined) {
            this.matches[i] = new Array<IMatch>()
        }
        this.matches[i].push(match) // Push the match onto the ith array within this.matches
    }

     /**
     * Returns the 2D array of IMatches stored within the MaximalMatches.
     */
    getMaximalMatches(): Array<Array<IMatch>> { 
        return this.matches
    }

    /**
     * Method returns a new IIterator for this collection of IMatches.
     */
    createIterator(): IIterator<Array<IMatch>> { // Returns an IIterator for MaximalMatches.
        return new MaxMatchesIterator(this)
    }
    
}

export default MaximalMatches


