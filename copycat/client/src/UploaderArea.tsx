import * as React from "react"
import FileUploader from "./FileUploader"
import { Row } from "antd"
import Layout from "antd/lib/layout/layout"

/**
 * Function for rendering the uploader area space in the browser. Places two FileUploader spaces in a row, one for each project. 
 */

export function UploaderArea() {

    return (
        <Layout className="UploaderArea">
            <p style={{margin: "0 auto"}}>A plagiarism detection device for Typescript files. Upload your projects below and hit "Detect Plagiarism."</p>
            <Row justify="center" className="Uploaders" id="FileUploaders">
                <div className="FU1">
                    <FileUploader id="Project 1"/>
                </div>
                <div className="FU2">
                    <FileUploader id="Project 2"/>
                </div>
            </Row>
        </Layout>
    )
}