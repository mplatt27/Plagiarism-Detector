import { IParser } from "./IParser"
import { IPlagiarismDetector } from "./IPlagiarismDetector"
import IProject from "./IProject"
import { ITokenManager } from "./ITokenManager"

/**
 * An interface for building a PlagiarismDetector. This builder pattern builds a list of
 * ISubmissions. In the current version, we only allow for 2 Submissions to be compared 
 * together at once. However, the list implementation allows for multiple Submissions to
 * be compared in later versions. It also takes in a list of IParser, one to parse each Submission.
 * The IParser interface also allows for different parsers to be used in the future. The
 * current version only parses Typescript. 
 */
export interface IBuilder {

    /**
     * Method gets the PlagBuilder's Projects. Returns an Array of IProject.
     */
    getProjects(): Array<IProject> 

    /**
     * Method gets the PlagBuilder's Parsers. Returns an Array of IParser.
     */
    getParsers(): Array<IParser> 

    /**
     * Method gets the PlagBuilder's TokenManagers. Returns an Array of ITokenManager.
     */
    getTokenManagers(): Array<ITokenManager> 

    /**
     * Method gets the PlagBuilder's Plagiarism detector. Returns an IPlagiarmsimDetector.
     */
    getPlagiarismDetector(): IPlagiarismDetector

}

