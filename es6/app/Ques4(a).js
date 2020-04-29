//Ques 4 Extract all keys inside address object from user object using destructuring ?
const user = {
firstName: 'sahil',
lastName: 'Dua',
Address: {
Line1: 'address line 1',
Line2: 'address line 2',
State: 'Delhi',
Pin: 110085,
Country: 'India',
City: 'New Delhi',
},
phoneNo: 9999999999
}

let{Address}=user;
let key=Object.keys(Address);
console.log(key);

export{key};
