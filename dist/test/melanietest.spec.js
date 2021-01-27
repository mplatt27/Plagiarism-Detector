// import { describe } from 'mocha';
// import {expect} from 'chai'
// import Submission from '../src/Submission';
// import MelanieSubmission from '../melanie/MelanieSubmission';
// import { exec } from 'child_process';
// import { executionAsyncId } from 'async_hooks';
// describe("Tests for MelanieSubmission class", () => {
//     it("Make submission for submission1", () => {
//         let sub1 = new MelanieSubmission('./src/Submission1.txt')
//         expect(sub1.getSubmission()).to.equal("Hello world my name is Melanie and I live in NH.")
//     })
//     it("Make submission for submission2", () => {
//         let sub2 = new MelanieSubmission('./src/Submission2.txt')
//         expect(sub2.getSubmission()).to.equal("Hi folks my name is Melanie and I come from NH.")
//     })
//     it("Make submission for a ts file", () => {
//         let sub3 = new MelanieSubmission('./src/Submission3.ts')
//         let actualString2 = "class MartianClass { // Represents a martian with a name."
//         + "\n    private name : string; // Name of the Martian." 
//         + "\n\n    public constructor(name: string) { // Construct a MartianClass"
//         + "\n        this.name = name;"
//         + "\n    }"
//         + "\n\n    public getName() { // Helper to get name. Returns a string."
//         + "\n        return this.name"
//         + "\n    }"
//         + "\n}"
//         //expect(sub3.getSubmission().trim()).to.equal(actualString2.trim())
//     })
//     it("testing hello class", () => {
//         let sub4 = new MelanieSubmission('./melanie/Submission5.ts')
//         let actualString = 'class myClass {'
//         +'\n'
//         +'\n}'
//         console.log("LOOK HERE");
//         console.log(sub4.getSubmission());
//         console.log(actualString);
//         if(sub4.getSubmission().normalize() === actualString.normalize()){
//             console.log('MATCH!!!');
//         }
//         expect(sub4.getSubmission().trim()).to.equal(actualString.trim())
//     })
//     it("Catch null value given to constructor", () => {
//         try {
//             let sub = new MelanieSubmission(null) 
//         } catch (error) {
//             // Error should be thrown.
//         }
//     })   
//     it("Catch empty string given to constructor", () => {
//         try {
//             let sub = new MelanieSubmission("") 
//         } catch (error) {
//             // Error should be thrown.
//         }
//     }) 
//     it("Catch nonexistent file name into constructor", () => {
//         try {
//             let sub = new MelanieSubmission("./Ravenclaw.ts") 
//         } catch (error) {
//             // Error should be thrown.
//         }
//     })     
// })
//# sourceMappingURL=melanietest.spec.js.map