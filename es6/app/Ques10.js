const arr = ["one",["two",2],"three",["four",4]];
arr.reduce((acc, val) => acc.concat(val), []);
console.log(arr);

export{arr};
