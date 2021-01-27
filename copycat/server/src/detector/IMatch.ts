/**
 * Interface represents a detected pattern between what is being compared. 
 * It holds the start index of the first token that matches
 * in each of the corresponding TokenManager lists, as well as the length of the match.
 */
export interface IMatch {

    /**
     * Method returns the start index of the match found in the first TokenManager.
     */
    getStartIndex1(): number
    
    /**
     * Method returns the start index of the match found in the second TokenManager.
     */
    getStartIndex2(): number

    /**
     * Method returns the length (number of Tokens) for the Match.
     */
    getLength(): number
}
