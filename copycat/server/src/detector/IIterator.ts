/**
 * Interface reprsents an Iterator which provides the functionality to iterate through a list of a generic, T.
 */
export interface IIterator<T> {
    /**
     * Method sets the first element in the Iterator.
     */
    first() : void 

    /**
     * Method advances to the next element in the Iterator.
     */
    next() : void  

    /**
     * Method returns true if the Iterator has reached the end of the list.
     */
    isDone() : boolean 

    /**
     * Method returns the current element that the Iterator is on.
     */
    current() : T 
}


