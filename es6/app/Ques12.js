// Q12. Implement Map using Es6
const arrayToMap = (array) => {
let valMap = new Map(array);
console.log(valMap);
console.log("Iterating through map : ")
for (let [key, value] of valMap.entries()) {
  console.log(`${key} points to ${value}`);
}}

console.log("Implementing Map: ");
let array1=[[1,"one"],[2,"two"],[3,"three"]];
arrayToMap(array1);

export {arrayToMap};
//Q12. Implement Set using Es6
const arrayToSet = (array) => {
let valSet = new Set(array);
console.log(valSet);
console.log("Iterating through set : ")
for (let elements of valSet.values()) {
console.log(elements);
}}

console.log("Implementing Set: ");
let array2=[1,2,3,5,4,1];
arrayToSet(array2);

export {arrayToSet};
