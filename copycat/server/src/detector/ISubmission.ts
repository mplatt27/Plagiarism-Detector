/**
 * The ISubmission interface represents a submission object.  It is constructed by
 * passing in the name of the file being read (as a string) and contains the content
 * of that file in a string.
 */

export interface ISubmission {

    /**
     * Returns the content of the Submission as a string.
     */

    getSubmission() : string
}

export default ISubmission