import {ISubmission} from './ISubmission'
import { readFileSync } from 'fs'
import { exception } from 'console'

/**
 * The Submission class represents a submission object.  It is constructed by
 * passing in the name of the file being read (as a string) and contains the content
 * of that file in a string.
 */

class Submission implements ISubmission {
    private submission : string // the entirety of the submission as a single string

    /**
     * Create a new Submission object representing a single file.  The file is indicated
     * by the file name specified as the input parameter.
     * 
     * @param fileName the name of the file that the Submission object represents
     */

    constructor(fileName : string) {

        if (fileName == null || fileName == "") {
            throw exception("Need a valid string for file name to create a Submission")
        }

        const file = readFileSync(fileName, 'utf-8')

        if (file == null) {
            throw exception("File name: '" + fileName + "' not found")
        }

        this.submission = file.toString()

        if (this.submission == "") {
            throw exception("Submission has no content")
        }
    }

    /**
     * Returns the content of the Submission as a string.
     */

    getSubmission() : string { // returns submission (string)
        return this.submission
    }
}

export default Submission