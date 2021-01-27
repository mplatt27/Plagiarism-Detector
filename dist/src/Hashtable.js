"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * I think we might be able to ditch this class altogether and use the built in Map() class for typescript.
 * It seems a lot easier than creating our own hashcode generator. (There isnt a built-in hashCode() method
 * in typescript like there is in Java.) -Arielle
 */
class Hashtable {
    constructor() {
        this.hashmap = new Hashtable();
    }
    clear() {
        this.hashmap.clear();
    }
    // Make a number hashcode for this token. Number will be of the form: [startIndex][tokenlength].
    // There is no built-in hashCode() method for Typescript.
    hashCode(index, tokens) {
        let toReturn = (index * 10) + tokens.length;
        return toReturn;
    }
    get(subString) {
        return this.hashmap.get(subString);
    }
    add(hash, subString) {
        this.hashmap.add(hash, subString);
    }
}
//# sourceMappingURL=Hashtable.js.map