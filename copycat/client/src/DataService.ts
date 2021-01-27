import axios from 'axios';

/**
 * The DataService class has two get methods for requests that the client has from the server. 
 */
export class DataService {

  /**
   * This function is used when the client runs the plagiarism detector. The output is requested from the server to display
   * on the screen in html. 
   */
  public static getDisplay(): Promise<Array<Array<string>>> {
    return axios.get<Array<Array<string>>>('http://localhost:3001/display')
      .catch((error: Error): any  => {
        console.error('Something went wrong: ', error.message)
        return { data: [] }
      })
  }

  /**
   * This function is used when the client runs the plagiarism detector. The file names are requested from the server to display
   * on the screen in html above each file. 
   */
  public static getFileNames(): Promise<Array<Array<string>>> {
    return axios.get<Array<Array<string>>>('http://localhost:3001/fileNames')
      .catch((error: Error): any  => {
        console.error('Something went wrong: ', error.message)
        return { data: [] }
      })
  }




}