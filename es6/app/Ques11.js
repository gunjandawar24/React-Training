class Node {
constructor(data, next = null) {
this.data = data;
this.next = next;
}
}

class LinkedList {
constructor() {
this.head = null;
}

addFirst(data) {
let newNode = new Node(data);
//The pointer next is assigned head pointer so that both pointers now point at the same node.
newNode.next = this.head;
//As we are inserting at the beginning the head pointer needs to now point at the newNode.
this.head = newNode;
}


addLast(data) {
let newNode = new Node(data);
// When head = null i.e. the list is empty, then head itself will point to the newNode.
if (!this.head) {
this.head = newNode;
}
// Else, traverse the list to find the tail (the tail node will initially be pointing at null), and update the tail's next pointer.
let tail = this.head;
while (tail.next != null) {
tail = tail.next;
}
tail.next = newNode;
}

lengthOfList() {
var count = 1;
let tail = this.head;
while (tail.next != null) {
tail = tail.next;
count += 1;
}
return count;
}


getLast() {
let tail = this.head;
while (tail.next != null)
tail = tail.next;
return tail.data;
}


getFirst() {
return this.head.data;
}
}


let list=new LinkedList();
list.addFirst(5);
list.addFirst(2);
list.addFirst(3);
list.addLast(6);
console.log("Linked List :-> ",list);
console.log("First-element of Linked List: ",list.getFirst());
console.log("Last-element of Linked List: ",list.getLast());
console.log("Length of linked list: ",list.lengthOfList()); 

export {LinkedList}
