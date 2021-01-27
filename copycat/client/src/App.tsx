
import React from 'react'
import './App.css'
import { UploaderArea } from './UploaderArea'
import {CopyCatHeader} from './CopyCatHeader'
import PlagiarismDetectorRunner from './PlagiarismDetectorRunner'

/**
 * The App function initializes the elements on the page and starts the PlagiarismDetectorRunner,
 * the client-side class that defines the actions of each of the buttons on the page.
 */

function App() {
  return (
    <div className='App'>
      < CopyCatHeader />
      < UploaderArea />
      < PlagiarismDetectorRunner />
    </div>
  )
}

export default App