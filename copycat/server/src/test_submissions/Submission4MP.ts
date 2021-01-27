// the second function matches the first function in the comparison file, but the names are changed


class Testing {
    constructor() {
        let mystring = 'Melanie'
    }
}

export function differentName(q : number) : void{
    if (q == 10) {
        console.log("yay!");
        
    } else {
        let differentList = ['hello', 'world', 'yay']
        differentList.forEach(element => {
            element = element + 'extra'
        });
    }
}