// a. Select all the list items on the page and convert to array.
let array=[];let lists=document.getElementById('List').getElementsByTagName("li");
for(var i=0;i<lists.length;i++){
  array.push(lists[i].innerHTML);
}
console.log(array);



// b. Filter for only the elements that contain the word 'flexbox'
console.log("Array that contain only 'flexbox' word");
let word=array.filter((a)=>a.toLowerCase().includes('flexbox'));
console.log(word);



// c. Map down to a list of time strings
let arrayTime=new Array();
for(var i=0;i<lists.length;i++)
{
arrayTime.push(lists[i].getAttribute("data-time"));
}
console.log(arrayTime);


// d. Map to an array of seconds let arraySecond = new Array();
arraySecond = arrayTime.map((a) => a.split(":")).map((a) => ((a[0] * 60) +(a[1])));
// console.log(arraySecond);



// e. Reduce to get total using .filter and .map
let totalTime;
totalTime=arraySecond.reduce((accumulator,currentValue)=>accumulator+currentValue);
console.log(totalTime);
