import {IPlagiarismDetector} from './IPlagiarismDetector'
import {ITokenManager} from './ITokenManager'
import {IMaximalMatches} from './IMaximalMatches'
import MaximalMatches from './MaximalMatches'
import Match from './Match'
import { IMatch } from './IMatch'
import { exception } from 'console'

/**
 * This class represents the functionality of the IplagiarismDetector and runs the main 
 * algorithm of the Plagiarism Detector program. By taking in two TokenManagers, a minimum 
 * search length, and an initial search length, it is prepared to have its method rkr_gst() 
 * called and to detect similarities among the Tokens between each TokenManager. It does so 
 * with an adaptation of the Running Karp-Rabin Matching and Greedy String Tiling (RKR-GST) 
 * algorithm (Wise, 1993).
 */
class PlagiarismDetector implements IPlagiarismDetector {
    private maxMatches: IMaximalMatches

    /**
     * A PlaigiarismDetector object is constructed with complete TokenManagers for each of the two 
     * Projects being compared, as well as a minimum search length and initial search length.
     * @param t1 an ITokenManager
     * @param t2 an ITokenManager
     * @param minLength a number
     * @param initLength a number
     */
    constructor(private t1: ITokenManager, private t2: ITokenManager, private minLength: number, private initLength: number) {
        if (t1 == undefined || t2 == undefined || minLength == undefined || initLength == undefined) {
            throw exception('Input cannot be undefined')
        }
        if (minLength > t1.getTokenizedList().length || minLength > t2.getTokenizedList().length)  {
            throw exception('Minimum length cannot be longer than submission')
        }
        if (minLength < 1)  {
            throw exception('Minimum length cannot be less than 1')
        }
        if (initLength < 1)  {
            throw exception('Initial search length cannot be less than 1')
        }
        if (initLength > t1.getTokenizedList().length || initLength > t2.getTokenizedList().length)  {
            throw exception('Initial search length cannot be longer than submission')
        }
        this.maxMatches = new MaximalMatches() // To be filled upon the rkr_gst() function call.
    }

    

    /**
     * Method runs an adaptation of the Running Karp-Rabin Matching and Greedy String Tiling (RKR-GST) 
     * algorithm (Wise, 1993), which scans sections of strings, starting with a generally wide search length 
     * and decrementing the length for each iteration. The method begins by calling a helper function 
     * scanpattern() to search for and save the longest MaximalMatch for the given search length. Next it 
     * calls a second helper function markStrings() which marks the Tokens which have been found to be 
     * included in a MaximalMatch. Finally, the method decreases its seach length and repeats until the 
     * search length has narrowed down the the min length. Returns void.
     */
    rkr_gst(): void {
        let searchLength = this.initLength                // Starting search length should equal the inital length given.
        let stop : boolean = false
        while (!stop) {                                   // Repeatedly checks string matching until it reaches the minimum search length.
            let longestMaximalMatch : number = this.scanPattern(searchLength) // Check the string lengths, get longest Match.
            if (longestMaximalMatch > 2 * searchLength) { // If the longest Match is greater than twice the search length.
                searchLength = longestMaximalMatch        // Then reset the search length to that that of the longest Match.
            }
            else {                                        
                this.markStrings()                        // Otherwise, create tiles from the Matches.
                if (searchLength > 2 * this.minLength) {  // Adjust search length for efficiency if super long. 
                    searchLength = Math.floor(searchLength/2)
                }
                else if (searchLength > this.minLength) { // Else if search length is longer than the min length.
                    searchLength = this.minLength         // Then reset the search length to equal the min length.
                }
                else if (searchLength == this.minLength) {// Else if the search length and min length are the same.
                    searchLength = this.minLength - 1     // Then decrease the search length.
                }
                else {                                    // Else the search length is less than the min length.
                    stop = true                           // So end the loop.
                }
            }
        }
    }
    
    /**
     * Method recompiles the original text for each TokenManager, adding in appropriate html 
     * formatting for marked Tokens and the end of each file as a 2D Array of strings.
     * The outer Array will be of length 2, with the first inner array consisting of the 
     * first Project and the second inner Array of the second Project. Returns this 2d Array
     * of strings.
     */
    finalOutput(): Array<Array<string>> {
        let project1Files = this.t1.getProject().getAllSubmissionsAsArrayOfStrings() // Get lengths of each file in Project 1.
        let project1FileLengths = new Array<number>()
        for (let i = 0; i < project1Files.length; i++)  {
            project1FileLengths.push(project1Files[i].length)
        }
        let project1Strings = this.t1.getProject().getAllSubmissionsAsSingleString() // Get Project 1 and 2 each as a single string.
        let project2Strings = this.t2.getProject().getAllSubmissionsAsSingleString()
        let newTokenRanges = []
        project1Strings = '<pre>' + project1Strings
        for (let i = 0; i < this.getT1().getTokenizedList().length; i++) {
            let tempTokenRange = this.getT1().getTokenizedList()[i].getRange()
            tempTokenRange[0] += 5                                  // Update start index.
            tempTokenRange[1] += 5                                  // Update end index.
            newTokenRanges.push(tempTokenRange)
        }
        let preCounter = 0
        let offset = 0
        for (let i = 0; i < project1FileLengths.length; i++){ 
            let tempString = project1Strings.slice(0, offset + project1FileLengths[i] + 5 + (11 * preCounter))
            tempString += '</pre><pre>' 
            tempString += project1Strings.slice(offset + project1FileLengths[i]  + 5 + (11 * preCounter))
            offset += project1FileLengths[i]
            preCounter++
            for (let j = 0; j < newTokenRanges.length; j++) {
                if (newTokenRanges[j][0] >= offset + 5 + (11 * (preCounter - 1))) { 
                    newTokenRanges[j][0] += 11
                    newTokenRanges[j][1] += 11
                }  
            }
            project1Strings = tempString
        }
        project1Strings = project1Strings.slice(0, project1Strings.length - 6) 
        
        let counter = 0
        for (let i = 0; i < this.getT1().getTokenizedList().length; i++) {
            if (this.getT1().getTokenizedList()[i].isMarked()) {
                let tempRange = newTokenRanges[i]
                let temp = project1Strings.slice(0, tempRange[0] + (13 * counter)) + "<mark>" // place mark tags into project1String.
                    + project1Strings.slice(tempRange[0] + (13 * counter), tempRange[1] 
                    + (13 * counter)) + "</mark>" + project1Strings.slice(tempRange[1] + (13 * counter))
                project1Strings = temp         // Once the whole file has been re-spliced, reset string variable.
                counter++
            }
        }
        let project2Files = this.t2.getProject().getAllSubmissionsAsArrayOfStrings() // Get lengths of each file in project 2.
        let project2FileLengths = new Array<number>()
        for (let i = 0; i < project2Files.length; i++)  { // Update file lengths.
            project2FileLengths.push(project2Files[i].length)
        }
        newTokenRanges = []
        project2Strings = '<pre>' + project2Strings
        for (let i = 0; i < this.getT2().getTokenizedList().length; i++) {
            let tempTokenRange = this.getT2().getTokenizedList()[i].getRange()
            tempTokenRange[0] += 5 // start index
            tempTokenRange[1] += 5 // end index
            newTokenRanges.push(tempTokenRange)
        }
        preCounter = 0
        offset = 0
        for (let i = 0; i < project2FileLengths.length; i++){ 
            let tempString = project2Strings.slice(0, offset + project2FileLengths[i] + 5 + (11 * preCounter))
            tempString += '</pre><pre>' 
            tempString += project2Strings.slice(offset + project2FileLengths[i]  + 5 + (11 * preCounter))
            offset += project2FileLengths[i]
            preCounter++
            for (let j = 0; j < newTokenRanges.length; j++) {
                if (newTokenRanges[j][0] >= offset + 5 + (11 * (preCounter - 1))) { 
                    newTokenRanges[j][0] += 11
                    newTokenRanges[j][1] += 11
                }  
            }
            project2Strings = tempString
        }
        project2Strings = project2Strings.slice(0, project2Strings.length - 6) 
        counter = 0
        for (let i = 0; i < this.getT2().getTokenizedList().length; i++) {
            if (this.getT2().getTokenizedList()[i].isMarked()) {
                let tempRange = newTokenRanges[i]
                let temp = project2Strings.slice(0, tempRange[0] + (13 * counter)) + "<mark>" 
                    + project2Strings.slice(tempRange[0] + (13 * counter), tempRange[1] 
                    + (13 * counter)) + "</mark>" + project2Strings.slice(tempRange[1] + (13 * counter))
                project2Strings = temp
                counter++
            }
        }
        return [[project1Strings], [project2Strings]] // change for project                 
    }

    /**
     * Method looks at what has been added to this.maximalMatches, and if it finds new entries, 
     * it updates the appropriate Token’s to be “marked”.
     */
    private markStrings(): void {
        let maxMatchesIter = this.maxMatches.createIterator()   // Create iterator for maximalMatches.
        for (maxMatchesIter.first(); !maxMatchesIter.isDone(); maxMatchesIter.next()) { // Iterate through maximalMatches.
            let queue = maxMatchesIter.current()
            if (queue == undefined || queue.length == 0) {
                continue
            } else {
                for (let j = 0; j < queue.length; j++) {        // Remove each Match from the queue.
                    let currentMatch : IMatch = queue[j]
                    this.maxMatches.remove(currentMatch)
                    let t1start = currentMatch.getStartIndex1()
                    let t2start = currentMatch.getStartIndex2()
                    for (var i = 0; i < currentMatch.getLength(); i++){ // Mark each Token in the Match.
                        this.t1.markToken(t1start + i) 
                        this.t2.markToken(t2start + i)
                    }
                }
            }
        } 
    }

    /**
     * Method looks for patterns of similarity between the two TokenManagers and save them as Match
     * objects within this.maximalMatches. The method does so by iterating through the first TokenManager,
     * t1, adding substrings of the search length to a HashMap, along with those substrings starting index.
     * The method moves right one Token per iteration. Next it iterates through the second TokenManager, 
     * t2, doing the same. If the method finds a substring which already existed within the HashMap before
     * that iteration, it creates a Match object and adds it to this.maximalMatches. The method continually
     * tracks the length of the longest found Match and ultimately returns that length as a number.
     * @param searchLength a number
     */
    private scanPattern(searchLength: number): number { 
        let map = new Map<string, Array<number>>()
        let indexNextUnmarked1 = this.t1.getNextUnmarked(0) 
        let indexNextUnmarked2 = this.t2.getNextUnmarked(0) 
        let maxMatch = 0                                         // Initialize as 0. This is what we are looking to increment and return.
        if (indexNextUnmarked1 != undefined) {                   // If an unmarked tokens exists.
            for (let i: number = indexNextUnmarked1; i < this.t1.getTokenizedList().length - searchLength; i++) { // Then keep iterating through t1, starting at the first unmarked Token found.
                if (!this.t1.getTokenizedList()[i].isMarked()) { // If token at index i is unmarked.
                    let nextMarked = this.t1.getNextMarked(i)    // Get the next MARKED token in t1.
                    let distToNextTile = 0
                    if (nextMarked == undefined) {               // Then nothing has been marked yet.
                        distToNextTile = searchLength            // So we want to look forward by [searchLength] indices.
                    } else {                                     // Else there are Tokens ahead that are marked.
                        distToNextTile = nextMarked - i          // So get the distance to the next marked Token.
                    }  
                    if (distToNextTile < searchLength) {         // We want to move our i to the next unmarked after this Token.
                        i = this.t1.getNextUnmarked(nextMarked) - 1 // So that we can call getNextUnmarked() starting at the next marked Token.                     
                    } else {                                     // Else we have enough Tokens to move through the next iteration of [searchLength].
                        let t1String = this.t1.getTokenizedString(i, i + searchLength) 
                        if (map.has(t1String.toString())) {      // If this substring already exists within the HashMap.                 
                            let list: Array<number> = map.get(t1String)
                            list.push(i)
                            map.delete(t1String)                 // Delete existing entry and replace below.
                            map.set(t1String, list)              // Add this entry of Tokens to the HashMap.
                        } else {
                            map.set(t1String, [i])               // Else add this substring and starting index to the HashMap.
                        }
                    }    
                }
            }
        }
        if (indexNextUnmarked2 != undefined) {                   // If an unmarked tokens exist.
            for (let i: number = indexNextUnmarked2; i < this.t2.getTokenizedList().length - searchLength; i++) { // Keep iterating through t2, starting at the first unmarked Token found.
                if (!this.t2.getTokenizedList()[i].isMarked()) { // If token at index i is unmarked.
                    let nextMarked = this.t2.getNextMarked(i)    // Get the next MARKED token in t2.
                    let distToNextTile = 0
                    if (nextMarked == undefined) {               // Then nothing has been marked yet.
                        distToNextTile = searchLength            // So we want to look forward by [searchLength] indices.
                    } else {                                     // Else there are Tokens ahead that are marked.
                        distToNextTile = nextMarked - i          // So get the distance to the next marked Token.
                    }  
                    if (distToNextTile < searchLength) {         // We want to move our i to the next unmarked after this Token. 
                        i = this.t2.getNextUnmarked(nextMarked) - 1 // So we can call getNextUnmarked() starting at the next marked Token.              
                    } else {                                     // Else we have enough Tokens to move through the next iteration of [searchLength].
                        let t2String = this.t2.getTokenizedString(i, i + searchLength)
                        let look: Array<number> = map.get(t2String) 
                        if (look == undefined) {                  // If substring is not in the HashMap, move on to next iteration.
                            continue
                        } else {                             
                            for (let m = 0; m < look.length; m++) { // Otherise, we have found a Match.
                                let k = searchLength
                                let t1String = this.t1.getTokenizedString(look[m], look[m] + k) 
                                let t2StringUpdated = t2String
                                while (true) {                    // While strings are still Matches as they increase in size.
                                    k = k + 1                     // Increment search length at the beginning of each loop.        
                                    if (look[m] + k >= this.t1.getTokenizedList().length || i + k >= this.t2.getTokenizedList().length) {
                                        break                     // If we have reached the end of the string, stop.
                                    }                             // Otherwise, get the next Token in the string.
                                    t1String = this.t1.getTokenizedString(look[m], look[m] + k) // Add next Token to the string for Project1.
                                    t2StringUpdated = this.t2.getTokenizedString(i, i + k) // Add next Token to the string for Project2.
                                    if (t1String !== t2StringUpdated) { // If strings no longer match, stop.
                                        break
                                    }
                                    if (this.t1.getTokenizedList()[look[m] + k].isMarked() || this.t2.getTokenizedList()[i + k].isMarked()) { 
                                        break                     // If the token we added is already marked, stop.
                                    } 
                                }
                                if (k > 2 * searchLength) {       // If we have found a match that is super long.
                                    let match = new Match(look[m], i, k) // Create new match (startIndexSub1, startIndexSub2, length of match).
                                    this.maxMatches.add(match)    // Add it to maximalMatches.
                                    return k                      // And early exit, return the super long length.
                                } else {
                                    let match = new Match(look[m], i, k) // Otherwise, still create new Match (startIndexSub1, startIndexSub2, length of match).
                                    this.maxMatches.add(match)    // Add it to maximalMatches.
                                }
                                if (k > maxMatch) {               // THEN if we have found a Match longer than the previously recorded longest Match.
                                    maxMatch = k                  // Reassign maxMatch to the length of the newly discovered longest Match.
                                }
                            }
                        }                       
                    }
                }
            }              
        }      
        return maxMatch                                           // Return the length of the longest Match found.
    }

    /**
     * Returns the IMaximalMatches for this PlagairismDetector. 
     */
    getMatches(): IMaximalMatches {
        return this.maxMatches
    }

    /**
     * Returns the first ITokenManager that was passed into the constructor.
     */
    getT1(): ITokenManager {
        return this.t1
    }

    /**
     * Returns the second ITokenManager that was passed into the constructor.
     */
    getT2(): ITokenManager {
        return this.t2
    }

    /**
     * Returns the number representing the initial search length that was passed into the constructor.
     */
    getInitialSearchLength(): number {
        return this.initLength
    }
    
    /**
     * Returns the number representing the minimum search length that was passed into the constructor.
     */
    getMinimalMatchLength(): number {
        return this.minLength
    }
}

export default PlagiarismDetector

