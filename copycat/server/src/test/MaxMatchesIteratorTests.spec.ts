import { expect } from "chai"
import Match from "../detector/Match"
import MaximalMatches from "../detector/MaximalMatches"
import MaxMatchesIterator from "../detector/MaxMatchesIterator"

/**
 * Test for the MaxMatchesIterator class. 
 */

describe("Tests for MaxMatchesIterator class", () => {
    it("Test iterator when MaximalMatches holds Matches of different sizes", () => {

        // create matches of size 4
        let m1 = new Match(2, 13, 4)
        let m2 = new Match(0, 4, 4)

        // create matches of size 5
        let m3 = new Match(124, 2, 5)

        // create matches of size 3
        let m4 = new Match(222, 5, 3)
        let m5 = new Match(2, 2, 3)
        let m6 = new Match(5, 10, 3)

        // create matches of size 8
        let m7 = new Match(123, 123, 8)

        // create maximal matches and add matches
        // should now be an array of arrays (each sub array holds matches of same length)
        let mm = new MaximalMatches()
        mm.add(m1)
        mm.add(m2)
        mm.add(m3)
        mm.add(m4)
        mm.add(m5)
        mm.add(m6)
        mm.add(m7)

        // create iterator
        let it = new MaxMatchesIterator(mm)
        

        // loop through iterator to see how many queues (sub arrays) are in MaximalMatches that are not emtpy
        let numQueues = 0
        for (it.first(); !it.isDone(); it.next()) {
            let queue = it.current();
            if (queue != undefined){
                numQueues++
            }
        }

        // there are should be 4 queues (sub arrays) in MaximalMatches that have Matches in them, 
        // so the loop should make numQueues reach 4
        expect(numQueues).to.equal(4)
    })

    it("Test iterator when MaximalMatches holds Matches of different sizes, and we remove a match while iterating", () => {

        // create matches of size 4
        let m1 = new Match(2, 13, 4)
        let m2 = new Match(0, 4, 4)

        // create matches of size 5
        let m3 = new Match(124, 2, 5)

        // create matches of size 3
        let m4 = new Match(222, 5, 3)
        let m5 = new Match(2, 2, 3)
        let m6 = new Match(5, 10, 3)

        // create matches of size 8
        let m7 = new Match(123, 123, 8)

        // create maximal matches and add matches
        // should now be an array of arrays (each sub array holds matches of same length)
        let mm = new MaximalMatches()
        mm.add(m1)
        mm.add(m2)
        mm.add(m3)
        mm.add(m4)
        mm.add(m5)
        mm.add(m6)
        mm.add(m7)

        // create iterator
        let it = new MaxMatchesIterator(mm)
        

       // loop through iterator; remove a match and keep iterating
       let numQueues = 0
       let totalLengthOfAllQueuesWithOneRemoved = 0 // 1 + 0 + 2 + 0 = 3
        for (it.first(); !it.isDone(); it.next()) {
            let queue = it.current();
            if (queue == undefined){
                continue
            } else {
                numQueues++
                let match = queue.pop()
                mm.remove(match)
                totalLengthOfAllQueuesWithOneRemoved += queue.length
            }
        }

        // there are should be 4 queues (sub arrays) in MaximalMatches that have Matches in them, 
        // so the loop should make numQueues reach 4
        expect(numQueues).to.equal(4)
        expect(totalLengthOfAllQueuesWithOneRemoved).to.equal(3)
    })

    it("Test iterator not using for-loop", () => {

        // create matches of size 4
        let m1 = new Match(2, 13, 4)
        let m2 = new Match(0, 4, 4)

        // create matches of size 5
        let m3 = new Match(124, 2, 5)

        // create matches of size 3
        let m4 = new Match(222, 5, 3)
        let m5 = new Match(2, 2, 3)
        let m6 = new Match(5, 10, 3)

        // create matches of size 8
        let m7 = new Match(123, 123, 8)

        // create maximal matches and add matches
        // should now be an array of arrays (each sub array holds matches of same length)
        let mm = new MaximalMatches()
        mm.add(m1)
        mm.add(m2)
        mm.add(m3)
        mm.add(m4)
        mm.add(m5)
        mm.add(m6)
        mm.add(m7)

        // create iterator
        let it = new MaxMatchesIterator(mm)
        

       // check next, hasNext, and isDone methods
       // we only have queues at the 3,4,5, and 8th index
       it.first()
       expect(it.next()).to.equal(undefined); // move to 1st index
       expect(it.next()).to.equal(undefined); // move to 2nd index
       it.next() // move to 3rd index (there should be a queue here)
       expect(it.current().length).to.equal(3) // there should be 3 matches of length 3 here
       it.next() // move to 4th index
       expect(it.current().length).to.equal(2) // there should be 2 matches of length 4 here
       it.next() // move to 5th index
       expect(it.current().length).to.equal(1) // there should be 1 match of length 5 here
       expect(it.next()).to.equal(undefined) // move to 6th index
       expect(it.next()).to.equal(undefined) // move to 7th index
       it.next() // move to 8th inded
       expect(it.current().length).to.equal(1) // there should be 1 match of length 8 here
    })

    it("Test iterator with one sub queue of Matches", () => {

        // create matches of size 4
        let m1 = new Match(2, 13, 4)
        let m2 = new Match(0, 4, 4)
        let m3 = new Match(124, 2, 4)
        let m4 = new Match(222, 5, 4)
        let m5 = new Match(2, 2, 4)
        let m6 = new Match(5, 10, 4)

        // create maximal matches and add matches
        // should now be an array of arrays (each sub array holds matches of same length)
        let mm = new MaximalMatches()
        mm.add(m1)
        mm.add(m2)
        mm.add(m3)
        mm.add(m4)
        mm.add(m5)
        mm.add(m6)

        // create iterator
        let it = new MaxMatchesIterator(mm)
        

       // check next, hasNext, and isDone methods
       // we only have queues at the 3,4,5, and 8th index
       it.first()
       expect(it.next()).to.equal(undefined); // move to 1st index
       expect(it.next()).to.equal(undefined); // move to 2nd index
       expect(it.next()).to.equal(undefined); // move to 3rd index
       it.next() // move to 3rd index (there should be a queue here)
       expect(it.current().length).to.equal(6) // there should be 3 matches of length 3 here

       // loop through iterator to see how many queues (sub arrays) are in MaximalMatches that are not emtpy
       let it2 = new MaxMatchesIterator(mm)
       let numQueues = 0
       for (it2.first(); !it2.isDone(); it2.next()) {
           let queue = it2.current();
           if (queue != undefined){
               numQueues++
           }
       }

       expect(numQueues).to.equal(1)
    })

    it("Test iterator with one sub queue of Matches, and remove a match in loop", () => {

        // create matches of size 4
        let m1 = new Match(2, 13, 4)
        let m2 = new Match(0, 4, 4)
        let m3 = new Match(124, 2, 4)
        let m4 = new Match(222, 5, 4)
        let m5 = new Match(2, 2, 4)
        let m6 = new Match(5, 10, 4)

        // create maximal matches and add matches
        // should now be an array of arrays (each sub array holds matches of same length)
        let mm = new MaximalMatches()
        mm.add(m1)
        mm.add(m2)
        mm.add(m3)
        mm.add(m4)
        mm.add(m5)
        mm.add(m6)

       // loop through iterator to see how many queues (sub arrays) are in MaximalMatches that are not emtpy
       let it2 = new MaxMatchesIterator(mm)
       let totalLengthOfAllQueuesWithOneRemoved = 0
       let numQueues = 0
       for (it2.first(); !it2.isDone(); it2.next()) {
           let queue = it2.current();
           if (queue == undefined){
               continue
            } else {
                numQueues++
                let match = queue.pop()
                mm.remove(match)
                totalLengthOfAllQueuesWithOneRemoved += queue.length
        }
       }

       expect(numQueues).to.equal(1)
       expect(totalLengthOfAllQueuesWithOneRemoved).to.equal(5)
    })

    it("Test iterator on emtpy MaximalMatches", () => {

       // create empty iterator
       let mm = new MaximalMatches()
       let it2 = new MaxMatchesIterator(mm)

       let totalLengthOfAllQueuesWithOneRemoved = 0
       let numQueues = 0
       for (it2.first(); !it2.isDone(); it2.next()) {
           numQueues++
       }

       it2.first()
       expect(it2.current()).to.equal(undefined)
       expect(numQueues).to.equal(0)
    })
})    