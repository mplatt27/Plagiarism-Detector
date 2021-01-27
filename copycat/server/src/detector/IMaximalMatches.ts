import { IIterator } from './IIterator'
import {IMatch} from './IMatch'

/**
 * Interface represents a collection of Matches of Tokens. They are stored in a 2D array 
 * of IMatches, which can be iterated through. The IMatches are separated in their sub 
 * arrays by their length, corresponding to the index of the outer array. Nothing will be
 * stored at the 0th index of the outer array.
 */
export interface IMaximalMatches {

    /**
     * Method returns the IMatch object that starts at the given index. If no IMatch exists at 
     * the given index, the method returns undefined.
     * @param startIndex : the start index of the IMatch object
     */
    find(startIndex: number): IMatch

    /**
     * Method removes the given IMatch from the collection of MaximalMatches, returning 1 upon
     * success and -1 upon failure. Will throw an exception if the IMatch passed in is undefined.
     * @param match : IMatch object to be removed
     */
    remove(match: IMatch): number

    /**
     * Method adds a given IMatch to the collection of MaximalMatches. Will throw an exception 
     * if the IMatch passed in is undefined.
     * @param match : IMatch to be added
     */
    add(match: IMatch): void

    /**
     * Method returns a new IIterator for this collection of IMatches.
     */
    createIterator(): IIterator<Array<IMatch>>

    /**
     * Method returns the 2D array of IMatches stored within the MaximalMatches.
     */
    getMaximalMatches(): Array<Array<IMatch>> 
}



