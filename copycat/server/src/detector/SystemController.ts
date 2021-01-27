import { IPlagiarismDetector } from "./IPlagiarismDetector"
import PlagBuilder from "./PlagBuilder"

/**
 * Class represents the Contoller for the program. It takes file names into the constructor. Upon
 * calling buildPlagiarismDetector() a Builder is initialized and from there, Projects, Parsers 
 * and TokenManagers are built in order to ultimately create a PlagiarismDetector for the 
 * Controller to work with. Finally, upon calling runPlagiarismDetector(), the Controller triggers 
 * the plagiarism detecting algoritm to run.
 */
class SystemController {
    private pd : IPlagiarismDetector
   
    constructor(private files : string[][]) { // Constructs with file names as a 2D Array of strings.
        let builder = new PlagBuilder(this.files)   // Uses file names to build a PlagDetector.
        this.pd = builder.getPlagiarismDetector()           
    }
   
    /**
     * Method runs the main algorithm on the PlagiarismDetector. Returns void.
     * of strings.
     */
    runPlagiarismDetector() : void {
        this.pd.rkr_gst()
    }

    /**
     * Method gets the final, compiled PlagiarismDetector output with html tags. Returns a 2D Array 
     * of strings.
     */
    getOutput() : Array<Array<string>> {
        return this.pd.finalOutput()
    }

    /**
     * Method gets the SystemController's Plagiarism detector. Returns an IPlagiarmsimDetector.
     */
    getPlagiarismDetector() : IPlagiarismDetector {
        return this.pd
    }
}

export default SystemController