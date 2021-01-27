import { exception } from 'console'
import ISubmission from './ISubmission'
import Submission from './Submission'
import { readFileSync } from 'fs'
import IProject from './IProject'

/**
 * The Project class represents a series of files, taken in by the constructor
 * or added via the addSubmission method.
 */

class Project implements IProject {

    private allSubmissionsAsSingleString : string
    private allSubmissionsAsArrayOfStrings : Array<string> // seperated by file
    private allSubmissionsAsArrayOfSubmissions : Array<ISubmission>

    /**
     * Create a new Project containing the files dictated by the file names
     * specified as the input parameter.
     * 
     * @param fileNames the names of the files to be part of the Project
     */

    constructor(private fileNames : Array<string>) {

        if (fileNames == null) {
            throw exception("File names cannot be null!")
        }

        this.allSubmissionsAsSingleString = ""
        this.allSubmissionsAsArrayOfStrings = []
        this.allSubmissionsAsArrayOfSubmissions = []

        for (let i : number = 0 ; i < this.fileNames.length ; i++) {

            if ((fileNames[i][fileNames[i].length - 2] != "t" || fileNames[i][fileNames[i].length - 2] != "j") && fileNames[i][fileNames[i].length - 1] != "s") {
                throw exception("File name: '" + fileNames[i] + "' is not a TypeScript or Javascript file!")
            }

            let file = readFileSync(fileNames[i], 'utf-8')
            
            if (file == null) {
                throw exception("File name: '" + fileNames[i] + "' not found!")
            }

            if (file.toString() == "") {
                throw exception("File name: '" + fileNames[i] + "' has no content!")
            }
            
            this.allSubmissionsAsArrayOfStrings.push(file.toString())
            this.allSubmissionsAsSingleString += file.toString()
            let sub = new Submission(fileNames[i])
            this.allSubmissionsAsArrayOfSubmissions.push(sub)
        }
    }

    /**
     * Add a new file to the project in all formats (submissions as a single string,
     * submissions as an array of strings, and submissions as an array of Submission
     * objects).
     * 
     * @param fileName the filename of the file to be added to the project
     *                 as a string
     */

    addSubmission(fileName : string) : void {

        if ((fileName[fileName.length - 2] != "t" || fileName[fileName.length - 2] != "j") && fileName[fileName.length - 1] != "s") {
            throw exception("File name: '" + fileName + "' is not a TypeScript or Javascript file!")
        }

        let file = readFileSync(fileName, 'utf-8')

        if (file == null) {
            throw exception("File name: '" + fileName + "' not found!")
        }

        if (file.toString() == "") {
            throw exception("File name: '" + fileName + "' has no content!")
        }

        this.allSubmissionsAsArrayOfStrings.push(file.toString())
        this.allSubmissionsAsSingleString += file.toString()
        //this.allSubmissionsAsSingleString.concat(file.toString())
        let sub = new Submission(fileName)
        this.allSubmissionsAsArrayOfSubmissions.push(sub)
    }

    /**
     * Obtain the names of all files in Project as an array of file names
     * represented as strings.
     */

    getFileNames() : Array<string> {
        return this.fileNames
    }

    /**
     * Obtain a single string of all files in the project stitched together,
     * back to back.
     */

    getAllSubmissionsAsSingleString() : string {
        return this.allSubmissionsAsSingleString
    }

    /**
     * Obtain an array of strings of all files in the project, in which each
     * string is the contents of a single file.
     */

    getAllSubmissionsAsArrayOfStrings() : Array<string> {
        return this.allSubmissionsAsArrayOfStrings
    }

    /**
     * Obtain an array of Submission objects of all files in the project, in
     * which each Submission object represents a single file in the project.
     */

    getAllSubmissionsAsArrayOfSubmissions() : Array<ISubmission> {
        return this.allSubmissionsAsArrayOfSubmissions
    }
}

export default Project