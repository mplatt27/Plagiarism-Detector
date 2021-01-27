import { IBuilder } from "./IBuilder"
import { IParser } from "./IParser"
import { IPlagiarismDetector } from "./IPlagiarismDetector"
import IProject from "./IProject"
import { ITokenManager } from "./ITokenManager"
import Parser from "./Parser"
import PlagiarismDetector from "./PlagiarismDetector"
import Project from "./Project"

/**
 * This class is an implementation of the IPlagiarismDetector. This builder pattern builds
 * a list of ISubmissions. In the current version, we only allow for 2 Submissions to be compared 
 * together at once. However, the list implementation allows for multiple Submissions to
 * be compared in later versions. It also takes in a list of IParser, one to parse each Submission.
 * The IParser interface also allows for different parsers to be used in the future. The
 * current version only parses Typescript. 
 */
class PlagBuilder implements IBuilder {
    private projects : Array<IProject>
    private parsers : Array<IParser>
    private tokenManagers : Array<ITokenManager>
    private minLength : number
    private initSearchLength : number
    private plagDetector : IPlagiarismDetector

    constructor(private files : Array<Array<string>>) { // Constructs a PlagBuilder with 2D Array of filenames.
        this.buildProjects(files)             // Use the filenames to build Projects.
        this.buildParsers()                   // Use the Projects to build Parsers.
        this.buildTokenMangers()              // Use the Parsers to build TokenManagers.
        this.buildPlagiarismDetector()        // Use the TokenManagers to build a PlagiarismDetector.
    }

    /**
     * Method builds the Project objects and saves them in an Array. Returns void.
     * @param files is a 2D Array of strings. The outer Array represents each Project.
     * The inner Array contains string representations of the individual file names. 
     */
    private buildProjects(files : Array<Array<string>>): void {
        let projects : Array<IProject> = []
        for (var i in files) {
            let project = new Project(files[i])
            projects.push(project)
        }
        this.projects = projects   
    }

    /**
     * Method builds Parses from the Projects that we have previously built and saves them in an
     * Array. Returns void.    
     */
    private buildParsers(): void {
        let parsers : Array<IParser> = []
        for (var i in this.projects) {
            let parser = new Parser(this.projects[i])
            parsers.push(parser)
        }
        this.parsers = parsers
    }

    /**
     * Method builds TokenManagers from the Parsers that we have previously built and saves them in
     * an Array. Returns void.
     */
    private buildTokenMangers() : void {
        let tokenManagers : Array<ITokenManager> = []
        for (var i in this.parsers) {
            let tm = this.parsers[i].getTokenManager()
            tokenManagers.push(tm)
        }
        this.tokenManagers = tokenManagers
    }

    /**
     * Method builds and saves a PlagiarismDetector. Before doing so, the method determines what 
     * the initial search length and minimum search length will be for that the PlagiarismDetector 
     * by looking at the lengths of the longest and shortest Projects to be compared.
     */
    private buildPlagiarismDetector() : void {
        let projectLengths: Array<number> = []              
        for (var i in this.tokenManagers) {     // Get the lengths of the Submissions in an Array.
            projectLengths.push(this.tokenManagers[i].getTokenizedList().length)
        } 
        let longest: number = Math.max.apply(null, projectLengths)   // Find the longest Project length.
        let shortest: number = Math.min.apply(null, projectLengths)  // Find the shortest Project length.
        if (longest / 2 > shortest) { // If the shortest length is shorter than the largest/2.
            this.initSearchLength = shortest // Then set initial search length to the shotest length.
        } else {                                    
            this.initSearchLength = Math.floor(longest / 2) // Else, set initial search length to longest/2.
        }
        if (shortest <= 40) {                   // If the shortest Project is 40 characters or less.
            this.minLength = 1                  // Then have a mimimum search length of 1.
        } else {                                
            this.minLength = 40                 // Otherwise the minimum search length will be 40.
        }
        let pd: PlagiarismDetector = new PlagiarismDetector(this.tokenManagers[0], 
            this.tokenManagers[1], this.minLength, this.initSearchLength)
        this.plagDetector = pd                  // Create and save PlagiarismDetector.
    }

    /**
     * Method gets the PlagBuilder's Projects. Returns an Array of IProject.
     */
    getProjects(): Array<IProject> {
        return this.projects
    }

    /**
     * Method gets the PlagBuilder's Parsers. Returns an Array of IParser.
     */
    getParsers(): Array<IParser> {
        return this.parsers
    }

    /**
     * Method gets the PlagBuilder's TokenManagers. Returns an Array of ITokenManager.
     */
    getTokenManagers(): Array<ITokenManager> {
        return this.tokenManagers
    }

    /**
     * Method gets the PlagBuilder's Plagiarism detector. Returns an IPlagiarmsimDetector.
     */
    getPlagiarismDetector(): IPlagiarismDetector {
        return this.plagDetector
    }
}

export default PlagBuilder