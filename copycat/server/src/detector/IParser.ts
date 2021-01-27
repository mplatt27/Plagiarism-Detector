import {ITokenManager} from './ITokenManager'

/**
 * Interface for a Parser, which takes an IProject into the constructor and uses Esprima to 
 * tokenize the content of the IProject. The tokenized result is stored in a newly created 
 * TokenManager object.
 */
export interface IParser {

    /**
     * Returns the newly created TokenManager
     */
    getTokenManager(): ITokenManager

}
