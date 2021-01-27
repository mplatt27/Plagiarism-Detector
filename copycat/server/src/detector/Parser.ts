import {IParser} from './IParser'
import {ITokenManager} from './ITokenManager'
import { IToken } from './IToken'
import Token from './Token'
import TokenManager from './TokenManager'
import IProject from './IProject'

/**
 * Parser class which implements IParser. Takes an IProject into the constructor and uses Esprima to 
 * tokenize the content of the IProject. The tokenized result is stored in a newly created 
 * TokenManager object.
 */
class Parser implements IParser {
    private projectString : string
    private tokenizedProject : ITokenManager

    constructor(private project : IProject) {
        this.projectString = project.getAllSubmissionsAsSingleString()
        this.tokenizedProject = this.parseProject(this.projectString)
    }

    /**
     * Returns the newly created TokenManager
     */
    getTokenManager() : ITokenManager {
        return this.tokenizedProject
    }


    /**
     * Break down the text contained in a project into an array of tokens.
     * These tokens are held by a TokenManager which is returned at the end
     * of the method
     * 
     * @param s the project being parsed
     */

    private parseProject(s : string) : ITokenManager {

        const esprima = require("esprima")
        let arr = esprima.tokenize(s, { range : true })
        
        let myTokens : Array<IToken> = []
        for (let i = 0; i < arr.length; i++) {
            let token = new Token(arr[i].value, arr[i].type, arr[i].range)
            myTokens.push(token)
        }
        
        return new TokenManager(myTokens, this.project)
    }
}

export default Parser