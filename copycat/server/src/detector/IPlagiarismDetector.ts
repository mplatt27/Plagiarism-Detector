import { ITokenManager } from "./ITokenManager"
import { IMaximalMatches } from "./IMaximalMatches"

/**
 * The IPlagiarismDetector is the interface for the the main algorithm of the Plagiarism 
 * Detector program. When rkr_gst() is called, it can detect similarities between two 
 * TokenManagers with an adaptation of the Running Karp-Rabin Matching and Greedy String 
 * Tiling (RKR-GST) algorithm (Wise, 1993).
 */
export interface IPlagiarismDetector {

    /**
     * Method runs an adaptation of the Running Karp-Rabin Matching and Greedy String Tiling (RKR-GST) 
     * algorithm (Wise, 1993), which scans sections of strings, starting with a generally wide search length 
     * and decrementing the length for each iteration. The method begins by calling a helper function 
     * scanpattern() to search for and save the longest MaximalMatch for the given search length. Next it 
     * calls a second helper function markStrings() which marks the Tokens which have been found to be 
     * included in a MaximalMatch. Finally, the method decreases its seach length and repeats until the 
     * search length has narrowed down the the min length. Returns void.
     */
    rkr_gst(): void

    /**
     * Method recompiles the original text for each TokenManager, adding in appropriate html 
     * formatting for marked Tokens and the end of each file as a 2D Array of strings.
     * The outer Array will be of length 2, with the first inner array consisting of the 
     * first Project and the second inner Array of the second Project. Returns this 2d Array
     * of strings.
     */
    finalOutput(): Array<Array<string>>

    /**
     * Method returns a number representing the given Initial Search Length that was passed into the
     * constructor.
     */
    getInitialSearchLength(): number

    /**
     * Method returns a number representing the given Minimum Search Length that was passed into the
     * constructor.
     */
    getMinimalMatchLength(): number

    /**
     * Returns the IMaximalMatches for this PlagairismDetector. 
     */
    getMatches(): IMaximalMatches

    /**
     * Returns the first ITokenManager that was passed into the constructor.
     */
    getT1(): ITokenManager

    /**
     * Returns the second ITokenManager that was passed into the constructor.
     */
    getT2(): ITokenManager
}
