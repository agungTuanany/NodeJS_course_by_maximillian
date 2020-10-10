const sum = (a, b) => {

    if (a && b) {
        return a + b;
    };

    throw new Error("invalid arguments");
};

// try {

//     console.log (sum (2));
// }
// catch (error) {
//     console.log("===> Error occured!")
//     // console.log("===>", error)
// }

console.log(sum(4));
console.log("This is called after sum function")
