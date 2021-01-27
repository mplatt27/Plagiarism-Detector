import React from "react"
import {Button, Layout, Row} from "antd"
import axios from 'axios'
import Parser from 'html-react-parser'
import {DataService} from "./DataService"

/**
 * This class represents the driver on the client side of the program. It sends and receives data
 * from the server upon any change within the UI and recompiles the results of the plagiarism
 * detection into a final html format and displays the output on the screen.
 */
export default class PlagiarismDetectorRunner extends React.Component<{}, any> {

    constructor(props: {}) { // Constructs a PlagairismDetectorRunner.
        super(props)
        this.state = {displayData:  null, fileNames: null} // DisplayData = Array<Array<string>> string of length 1      
    }                                                      // fileNames = Array<array<string>> strings of file names

    /**
     * This method is called when the user clicks the "rest" button on the UI. It sends
     * a message to the server that it should clear its previous compilation and prepare
     * to run again.
     */
    reset() {
        this.setState({displayData: null, fileNames: null})

        const json = JSON.stringify("clear")
        axios.post('http://localhost:3001/clear', json)

    }

    /**
     * This method is called when the user clicks the "detect plagairism" button on the UI.
     * It sends a message to the server that it should upload the current files, and
     * run its algorithm on them. When the back end finishes running, it send the recompiled
     * files back.
     */
    onDetectPlagiarism() { 
        const json = JSON.stringify("start")
        axios.post('http://localhost:3001/startPlagDet', json)
    }

    /**
     * Think method is called when the user clicks the "detect plagiarism" button on the UI.
     * onDisplay() calls upon the function getDisplay() from the DataService file to get and
     * set the most recent output (saved as displayData) and file names (fileNames).
     */
    onDisplay() {
        DataService.getDisplay()
            .then((response: any) => {
                let temp = response.data[0].title
                this.setState({displayData: temp}) 
            })
            DataService.getFileNames()
            .then((response: any) => {
                let names = response.data[0].fileNames
                this.setState({fileNames: names})
            })
    }

    /**
     * This method first checks that there are currently file outputs and file names in the
     * state and if so, recompiles them a final time before returning it as a part of the
     * html for the output on the screen.
     */
    fileData() { 
        if (this.state.displayData && this.state.displayData[0] !== undefined && this.state.displayData[0] !== null && this.state.fileNames !== null && this.state.fileNames[0] !== null) { 
            let toSplit1: Array<string> = this.state.displayData[0][0].split("</pre>")
            let project1 = ""
            for (let i = 0; i < toSplit1.length; i++) {
                project1 += this.state.fileNames[0][i].split("/")[1] + toSplit1[i] + "</pre>"
            }
            let toSplit2: Array<string> = this.state.displayData[1][0].split("</pre>")
            let project2 = ""
            for (let i = 0; i < toSplit2.length; i++) {
                project2 += this.state.fileNames[1][i].split("/")[1] + toSplit2[i] + "</pre>"
            }
            return ( 
                <div id="htmlpage"> 
                    <Row justify="space-around" >
                        <td className="OutputArea1"><p className='OutputHeader'>Project 1</p>{Parser(project1)}</td>
                        <td className="OutputArea2"><p className='OutputHeader'>Project 2</p>{Parser(project2)}</td>
                    </Row>
                </div> 
            )
        } else {
            return (
                <div></div>
            )
        } 
    }

    /**
     * This method renders the html for the "detect plagairism" button, the "rest button", and
     * the final output of the uploaded files.
     */
    render() {
        return(
            <Layout>
                <div className="UpdateResetButtonArea">
                    <Button className="DetectAndResetButtons" 
                            id="detectPlagiarism" 
                            onClick={() => {
                                this.onDetectPlagiarism()
                                this.onDisplay()
                            }}>
                        Detect Plagiarism
                    </Button>
                    <Button className="DetectAndResetButtons" 
                            id="reset" 
                            onClick={() => {
                                this.reset()
                            }}>
                        Reset
                    </Button>
                </div>
                <div className="output">
                    {this.fileData()}
                </div>
            </Layout>      
        )
    }
}