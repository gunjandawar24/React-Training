const newArray = (duplicateArray) => {
let result = new Set(duplicateArray);
return result;
}

let duplicateArray = [1, 2, 2, 3, 3, 10, 10];
console.log("unique elements of ${duplicateArray} are--> ");
console.log(newArray(duplicateArray));

export {newArray};
