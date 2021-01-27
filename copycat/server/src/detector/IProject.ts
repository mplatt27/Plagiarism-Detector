import ISubmission from './ISubmission'

/**
 * The IProject interface represents a series of files, taken in by
 * the constructor or added via the addSubmission method.
 */

interface IProject {

    /**
     * Obtain the names of all files in the project as an array of file names
     * represented as strings.
     */

    getFileNames() : Array<string>

    /**
     * Obtain a single string of all files in the project stitched together,
     * back to back.
     */

    getAllSubmissionsAsSingleString() : string

    /**
     * Obtain an array of strings of all files in the project, in which each
     * string is the contents of a single file.
     */

    getAllSubmissionsAsArrayOfStrings() : Array<string>

    /**
     * Obtain an array of Submission objects of all files in the project, in
     * which each Submission object represents a single file in the project.
     */

    getAllSubmissionsAsArrayOfSubmissions() : Array<ISubmission>

    /**
     * Add a new file to the project in all formats (submissions as a single string,
     * submissions as an array of strings, and submissions as an array of Submission
     * objects).
     * 
     * @param fileName the filename of the file to be added to the project
     *                 as a string
     */

    addSubmission(fileName : string) : void
}

export default IProject