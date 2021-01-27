import * as express from 'express';
import * as fileUpload from 'express-fileupload';
import * as fs from 'fs';
import SystemController from './detector/SystemController';

/**
 * This file represents the server API. Performs the following tasks when requested from the client:
 * 
 * Receives files from the client and saves them to a local folder
 * Receives file names from the client and saves them to an array
 * Receives message to run the plagiarism detector, and activates the controller to run the detector
 * Receives message to send the display output for the detector
 * Receives message to clear the current detector files and reset
 */

// Initialize the server
const app: express.Application = express();

// Initialize the Path
var myPath = require('path')

// Arrays to hold the project file names as strings as they come in from the client
const project1Files : Array<string> = []
const project2Files : Array<string> = []

// Array the display html strings once the plagiarism detector has run as well as the file names
// This is for sending to the client when requested
let display = [{title: new Array<Array<string>>(), fileNames: new Array<Array<string>>()}]


app.use(express.json({type: 'json'}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(fileUpload());

/**
 * Receives files for project 1 from the client and saves them locally. Saves project file names in array. 
 */
app.post('/file1', (req, res) => {

  let myFiles: fileUpload.UploadedFile[] = []
  var fileKeys = Object.keys(req.files)

  fileKeys.forEach(function(key) {
    myFiles.push(req.files[key])
  })

  for (let i = 0; i < myFiles.length; i++) {
    let saveName = myFiles[i].name 
    var fileName = myPath.join('data1', saveName)
    project1Files.push('data1/' + myFiles[i].name)
    fs.writeFileSync(fileName, myFiles[i].data)
  }

  res.status(200).send("File uploaded successfully")

})

/**
 * Receives files for project 2 from the client and saves them locally. Saves project file names in array. 
 */
app.post('/file2', (req, res) => {

  let myFiles: fileUpload.UploadedFile[] = []
  var fileKeys = Object.keys(req.files)

  fileKeys.forEach(function(key) {
    myFiles.push(req.files[key])
  })

  for (let i = 0; i < myFiles.length; i++) {
    let saveName = myFiles[i].name 
    var fileName = myPath.join('data2', saveName);
    project2Files.push('data2/' + myFiles[i].name)
    fs.writeFileSync(fileName, myFiles[i].data)
  }

  res.status(200).send("File uploaded successfully")
})

/**
 * Receives message from client to start plagiarism detector. Creates the controller and runs the detector, then gets and saves the output.
 */
app.post('/startPlagDet', (req, res) => {

  if (project1Files.length > 0 && project2Files.length > 0) {
    let controller = new SystemController([project1Files, project2Files])
    controller.runPlagiarismDetector()
    display[0].title = controller.getOutput()
  }

})

/**
 * Resets the system -- clears the project1Files and project2Files arrays, and resets the dsiplay array to empty. 
 */
app.post('/clear', (req, res) => {

  let p1length = project1Files.length
  for (let i = 0 ; i < p1length ; i++) {
    project1Files.pop()
  }

  let p2length = project2Files.length
  for (let i = 0 ; i < p2length ; i++) {
    project2Files.pop()
  }


  display = [{title: new Array<Array<string>>(), fileNames: new Array<Array<string>>()}]
 
})

/**
 * Sends the display to the client when requested. 
 */
app.get('/display', (req, res) => {
  res.status(200).send(display);
});

/**
 * Sends the file names to the client when requested. 
 */
app.get('/fileNames', (req, res) => {
  display[0].fileNames = [project1Files, project2Files]
  res.status(200).send(display)
})

/*
  Catch all route which matches any type of request on any route.
  Returns 404 not found.

  IMPORTANT: Express routes are checked sequentially and and first matching handlers is the one to respond.
             Always keep this last or all requests will result in a 404 error.

*/
app.all('*', (req, res) => {
  res.status(404).send('Not Found!')
})

app.listen('3001', () => {
  console.log('server running on localhost:3001/');
})
