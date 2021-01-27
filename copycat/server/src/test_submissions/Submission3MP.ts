// this file should have one function in common with the file we are checking it against
export function foo(x : number) : void{
    if (x == 10) {
        console.log("yay!");
        
    } else {
        let myList = ['hello', 'world', 'yay']
        myList.forEach(element => {
            element = element + 'extra'
        });
    }
}

export function foo2() : void{
    let y = 0
    while(y < 5) {
        y++ 
    }
}