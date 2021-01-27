# README for CopyCat Plagiarism Detector

*Thank you for using CopyCat!*

Developed by:

Sina Salehi

Melanie Platt

Arielle Slatus

Leora Fink

for CS5500 (Foundations of Software Engineering) at Northeastern University

## Installation Instructions

1. Navigate to the upper-most directory of the repository.  From here, navigate to the server directory with the following command:

    `cd .\copycat\server`

1. Afterwards, use the Node Package Manager (NPM) to install all required libraries and types for the functionality of the server with the following command:

    `npm install`

1. Next, start the server with the following command:

    `npm start`

1. You will know that the server has finished loading and is running and awaiting client interaction when the following prompt appears in the terminal:

    `server running on localhost:3001/`

1. Once the server is running, open a new terminal.  Navigate to the upper-most directory of the repository.  From here, navigate to the client directory with the following command:

    `cd .\copycat\client`

1. Afterwards, use the Node Package Manager (NPM) to install all required libraries and types for the functionality of the client with the following command:

    `npm install`

1. Next, start the client with the following command:

    `npm start`

1. After a short while, the application will load into a new tab in your default web browser.  At this point, the application is running and ready for user interaction and input.

**NOTE**: This may take a minute or two.  Please be patient.

## User Guide

The application has finished loading when the CopyCat logo and header have appeared in the bar at the top of the page, and the project upload areas, “Detect Plagiarism” button, and “Reset” button have appeared below it.

![CopyCat Main Page](/READMEImages/CopyCatMainScreen.png)

### To Upload New Projects for Comparison

1. Click the “Choose Files” button in the Project 1 upload area.

    ![Project 1 Upload Area](/READMEImages/Project1UploadArea.png)

1. A file selection window appears.  Select the files that you wish to add to Project 1.  Click the “Open” button in the lower right corner of the window.

1. The files that you selected to add to Project 1 are added to the list of files under the “Files Waiting to be Uploaded” header in the Project 1 upload area.

    ![Project 1 Files Waiting to be Uploaded](/READMEImages/Project1FilesWaitingToBeUploaded.png)

1. Click the “Choose Files” button in the Project 2 upload area.

1. A file selection window appears.  Select the files that you wish to add to Project 2.  Click the “Open” button in the lower right corner of the window.

1. The files that you selected to add to Project 2 are added to the list of files under the “Files Waiting to be Uploaded” header in the Project 2 upload area.  Click the “Upload!” button in the Project 1 upload area.

1. The “Files Waiting to be Uploaded” header in the Project 1 upload area changes text to “Files Are Uploaded,” indicating that the files listed in the Project 1 upload area have been uploaded to the server.

    ![Project 1 Files Are Uploaded](/READMEImages/Project1FilesAreUploaded.png)

1. Click the “Upload!” button in the Project 2 upload area.

1. The “Files Waiting to be Uploaded” header in the Project 2 upload area changes text to “Files Are Uploaded,” indicating that the files listed in the Project 2 upload area have been uploaded to the server.  At this point, the files that you selected for Project 1 and the files that you selected for Project 2 have been uploaded to the server.

### To Compare Two Uploaded Projects

1. Upload two projects for comparison as detailed in “To Upload New Projects for Comparison.”

1. Click the “Detect Plagiarism” button below the two project upload areas.

1. The files of Project 1 are listed on the left half of the page and the files of Project 2 are listed on the right half of the page beneath their corresponding headers.  Plagiarized elements, or elements that are discerned to be the same or highly similar between the files of the two projects, are highlighted in yellow.

**NOTE**: This may take a minute or two.  Please be patient.

![Files Uploaded and Displayed](/READMEImages/FilesUploadedAndDisplayed.png)

![Element Highlighting](/READMEImages/FileComparison.png)

### To Reset the State of the Application

1.  Upload two projects for comparison as detailed in “To Upload New Projects for Comparison.”

1. Compare the two uploaded projects as detailed in “To Compare Two Uploaded Projects.”

1. Click the “Reset” button below the two project upload areas.

1. The two projects listed below the “Detect Plagiarism” and “Reset” buttons disappear.  The state of the application has been reset to its original state and you may upload and compare two new projects.