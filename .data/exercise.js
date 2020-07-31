/*
 * uncoment the block of "//" code to run.
 *
 */
const person = {
    name: "Anton",
    age: 29,
    greet() {
        console.log(`Hi, I am ${this.name}`)
    },
    walks() {
        console.log(`${this.name} walk`)
    }

}

/*
 * This keyword in object
 */

// console.log(person.greet(),"\n") // Don't do this for calling the object properties
// console.log("============")
// console.log(person.walks(),"\n") // Don't do this for calling the object properties
// console.log("============")
// person.walks()  // this keyword refer to method
// person.greet()  // this keyword refer to global object not into method


/*
 * What slice() method ?
 *
 * Slice is simply copies an array.
 *
 * With passing arguments we copy to narrow down the 'range' of elements we want.
 *
 * Without any arguments we copies entire array.
 *
 */

const hobbies = ["Sports", "Running"];

// const copiedArray = hobbies.slice();
// console.log("copiedArray ===+>",copiedArray);
// console.log("");

// // copies nested array (array with another array in it)
// const copiedArray2 = [hobbies];
// console.log("copiedArray2 ===+>",copiedArray2);
// console.log("");

/*
 * Spread operator is same functionality as slice() method do.
 *
 * Spread operator take an array of object and pull out all the elements or
 * properties and put it whatever is around that spread operator
 *
 */

// const copiedArray3 = [...hobbies];
// console.log("copiedArray3 ===+>",copiedArray3);
// console.log("");


// const copiesPerson = {...person};
// console.log("copiesPerson ===+>", copiesPerson);
// console.log("");

/*
 * Rest operator used to merge multiple arguments into an array in the arguments
 * list of a function
 *
 */

// const plainToArray = (arg1, arg2, arg3) => [arg1, arg2, arg3];
// console.log("plainToArray ===+>", plainToArray(1, 2, 3));
// console.log("");
// console.log("add forth arguments into plainToArray(1, 2, 3, 4) ===+>", plainToArray(1, 2, 3, 4))
// console.log("");

// const restToArray = (...args) => [...args];
// console.log("restToArray(1, 2, 3, 4) ===+>", restToArray(1, 2, 3, 4));
// console.log("restToArray(1, 2, 3, 4, 5, 6) ===+>", restToArray(1, 2, 3, 4, 5, 6));

/*
 * Destructuring
 *
 */

// const printName = (personData) => console.log("personData ===+>",personData.name);
// printName(person)
// console.log("")

// const printNameDesctructuring = ({ name }) => console.log("printNameDesctructuring ===+>", name)
// printNameDesctructuring(person)
// console.log("")

// const printWalksDesctructuring = ({ name, greet, walks }) => {

//     // console.log("printWalksDesctructuring ===+>", walks()) // !!! Dont do like tbis
//     // console.log("printWalksDesctructuring ===+>", greet()) // !!! Dont do like this
//     console.log(name);
//     console.log("");
//     return
// }
// printWalksDesctructuring(person)

// const { name, age } = person;
// console.log (name , age);
// console.log("");

// const [hobby1, hobby2] = hobbies;
// console.log(hobby1, hobby2);
// console.log("");

/*
 * Async code vs Promise
 *
 * what is callback ?
 *
 * Is a function should execute in future.
 *
 */

// const fetchData = callback => {

//     setTimeout(() => {

//         console.log("=====//=====")
//         callback("Done! from fetchData");
//     }, 1500)
// }

// // asynchronous
// setTimeout(() => {

//     console.log("====///====")
//     console.log("Timers, is done from fecthData");
//     fetchData(text => console.log(text));
// }, 200);

// // synchronous
// console.log("hello! from fetchData");
// console.log("hi from fetchData");

/*
 * With using promise the code became sync.
 * In simple word, the code execute
 *
 */

// const fetchData2 = () => {

//     const promise = new Promise((resolve, reject) => {

//         setTimeout(() => {

//             resolve("Done! from fetchData2");
//         }, 1500);
//     });

//     return promise;
// };

// setTimeout(() => {

//     console.log("=====//===== setTimeout")
//     console.log("Timer is done! from fetchData2");

//     fetchData2()
//         .then(text => {
//             console.log("=====///===== setTimeout fetchData2")
//             console.log(text)
//             return fetchData2()
//         })
//         .then(text2 => {
//             console.log("=====////===== setTimeout fetchData2")
//             console.log(text2)
//         });

// }, 1500);

// console.log("hello! fetchData2");
// console.log("hi fetchData2");
