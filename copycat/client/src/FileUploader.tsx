import axios from 'axios'
import { Input, Form, Layout, Button } from "antd"
import React from "react"
import { CheckCircleOutlined, SendOutlined } from '@ant-design/icons'
import sanitize from 'sanitize-html'
import Parser from 'html-react-parser'

/**
 * Defines what type the FileUploader props are going to be. Contains a string id.
 */
type FileUploaderProps = { 
  id: string 
}

/**
 * Class represents a FileUploader object which allows a user to upload multiple files at once
 * and sends them to the server. Provides visual feeback to the user upon selecting and uploading 
 * files. Also displays all of the file names which have been selected or uploaded by this 
 * FileUploader. 
 */
export default class FileUploader extends React.Component<{}, any> {
  private id: string 
  
  constructor(public props: FileUploaderProps){ // Constructs a FileUploader with FileUploaderProps.
      super(props)
      this.id = this.props.id
      this.state = { selectedFile: null, hasUploaded: false }
  }

  /**
   * Updates the state of this FileUploader upon a change to the files it has currently selected so that
   * its state contains the current selections. Also updates a boolean usUploaded within the state which 
   * tracks whether the currently held files have been uploaded to the server. 
   * @param event of type any.
   */
  private onFileChange = (event: any) => { 
    this.setState({ selectedFile: event.target.files })
    this.setState({ hasUploaded: false })
  }

  /**
   * Method is called upon when the user clicks the "Upload" button. If there are currently files
   * selected by this FileUploader then it will send their data to the server and update the state of
   * hasUploaded for whether this FileUploader's contents have been uploaded.
   */
  private onFileUpload = () => { 
    const formData = new FormData()
    if (this.state.selectedFile != null) {
      this.setState({ hasUploaded: true })
      for (var i = 0; i < this.state.selectedFile.length; i++) {
        formData.append(`file${i}`, this.state.selectedFile[i], this.state.selectedFile[i].name)
      }
      if (this.id === "Project 1") {
        axios.post('http://localhost:3001/file1', formData) 
      } else {
        axios.post('http://localhost:3001/file2', formData)
      }
    } 
  }


  /**
   * Method determines what text will be displayed about this FileUplaoder. If the FileUploader 
   * has no files selected, it displays a message instructing the user to select files. If
   * the FileUploader has files selected, but not yet uploaded to the server, it displays a list
   * of the selected file names and indicates that they are waiting to be uploaded. Once the
   * FileUplaoder's files have been uploaded to the server, the display informs the user that they 
   * indeed were uploaded and still lists out the names of the uploaded files.
   */
  private fileData = () => { 
    if (!this.state.hasUploaded && this.state.selectedFile) { // Files have been selected, but not uploaded.
      let project = ""
        for (let i = 0; i < this.state.selectedFile.length; i++) { // Collect the selected file names.
          project =  project + this.state.selectedFile[i].name + "<br></br>"
      }
      return (    // Returns the proper html output for displaying the selected file names.
        <div> 
          <h2>Files Waiting to be Uploaded: <SendOutlined /></h2> 
          <p>{Parser(sanitize(project))}</p> 
        </div> 
      )
    } else if (this.state.hasUploaded && this.state.selectedFile) { // Files have been selected and uploaded.
      let project = ""
        for (let i = 0; i < this.state.selectedFile.length; i++) { // Collect the uploaded file names.
          project =  project + this.state.selectedFile[i].name + "<br></br>"
      }
      return (    // Returns the proper html output for displaying uploaded file names.
        <div> 
          <h2>Files Are Uploaded: <CheckCircleOutlined /></h2> 
          <p>{Parser(sanitize(project))}</p> 
        </div> 
      )
    } else {      // There are not yet files selected.
      return (    // Returns the proper html output instructing the user to select some files.
        <div> 
          <br /> 
          <h4>Choose before pressing the upload button</h4> 
        </div> 
      )
    } 
  }

  /**
   * Method renders the html for the FileUploder.
   */
  render(){
    return <Layout>
      <Layout.Content className="UploaderBox">
        <h1 className="UploaderHeader">{this.id}</h1>
        <Form className="UploaderForm"> 
          <Form.Item >
            <Input type="file" multiple accept='.ts, .js' onChange={this.onFileChange} style={{borderRadius:"5px"}}/>
          </Form.Item> 
          <Button className="UploadButton" onClick={this.onFileUpload} > 
            Upload! 
          </Button> 
          {this.fileData()}
        </Form> 
      </Layout.Content> 
    </Layout>
  }
}
