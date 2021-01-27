class MartianClass1 { //testing parser - should avoid comments
    /* testing that it avoids block comment
    */
    public constructor(private name: string) {
    }

    public getName() { // comment comment 
        return this.name
    }
}