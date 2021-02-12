/* =========================================================
1. Create a linked list class
Walk through the linked list code in the curriculum and understand it well. 
Then write a linked list class and its core functions 
---(insertFirst, insertLast, remove, find) from scratch.
=========================================================*/

//this denotes a "Node Class" which is a private class that
//should not be accessible by anyone other than the linked list class
//as denoted by the _ before "Node"
//"next" serves as a pointer to the next node
class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}
//primary functions of a linked-list are
/*
"insert"
--3 different implementations
--item can be inserted:
----At the beginning of the list (insertFirst)
----At the end of the list (insertLast)
----Anywhere in the list, between 2 nodes (insert, insertAt)
*/
/*
"remove"
--Delete from the beginning of the list
--Delete from the end of the list
--Delete a node between 2 other nodes

*/

/*"get"(find)*/
//Building a LinkedList
class LinkedList {
  constructor() {
    this.head = null;
  }
  //this method inserts an item at the beginning of a list
  insertFirst(item) {
    //create a new node item
    //point the head to that new node
    this.head = new _Node(item, this.head);
  }
  //this method inserts an item at the end of a list, and is a bit more complex
  insertLast(item) {
    //Check to see if the list is empty
    //if it is, then insert the new item as the only item in the list
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      //Create a new node item
      let tempNode = this.head;
      //Start at the beginning of the list and move through the list until you reach the end of the list
      while (tempNode.next !== null) {
        //Set the end node's "next" pointer to the new node
        tempNode = tempNode.next;
      }
      //The new node's "next" pointer is "null" (indicating that the new node now is the last node on the list)
      tempNode.next = new _Node(item, null);
    }
  }

  insertBefore(insertItem, value) {
    let currentNode = this.head;

    while (value !== currentNode.next.value) {
      currentNode = currentNode.next;
    }
    let findValue = this.find(value);

    currentNode.next = new _Node(insertItem, findValue);
  }

  insertAfter(insertItem, value) {
    let findValue = this.find(value);
    let tempNext = findValue.next;
    findValue.next = new _Node(insertItem, tempNext);
  }

  insertAt(insertItem, position) {
    let currentNode = this.head;
    let count = 0;

    while (currentNode.next !== null) {
      count++;
      if (count === position) {
        this.insertBefore(insertItem, currentNode.value);
      }
      currentNode = currentNode.next;
    }
  }

  find(item) {
    // Start at the head
    let currentNode = this.head;
    //if the list is empty
    if (!this.head) {
      return null;
    }
    // Check for the item
    while (currentNode.value !== item) {
      //Return null if it is the end of the list and the item is not on the list
      if (currentNode.next === null) {
        return null;
      } else {
        //Otherwise, keep looking
        currentNode = currentNode.next;
      }
    }
    // Found it
    return currentNode;
  }
  remove(item) {
    //If the list is empty
    if (!this.head) {
      return null;
    }
    // If the node to be removed is head, make the next node head
    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }
    // Start at the head
    let currentNode = this.head;
    // Keep track of the previous
    let previousNode = this.head;

    while (currentNode !== null && currentNode.value !== item) {
      // Save the previous node
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    if (currentNode === null) {
      console.log('Item not found');
      return;
    }
    previousNode.next = currentNode.next;
  }
}

/* =========================================================
2. Create a singly linked list

- Write a function main. Within the function, using the linked list class above, 
create a linked list with the name SLL and add the following items to your linked list: 
Apollo, Boomer, Helo, Husker, Starbuck.
- Add Tauhida to the list.
- Remove squirrel from the list.
- Implement a function called insertBefore() in the class that inserts a new node before a given node containing a key.
- Implement a function called insertAfter() in the class that inserts a new node after a node containing the key.
- Implement a function called insertAt() that inserts an item at a specific position in the linked list.
- Add Athena before Boomer using your insertBefore() function.
- Add Hotdog after Helo using the insertAfter() method.
- Using the insertAt() method insert Kat in the 3rd position of the list.
- Remove Tauhida from the list.
=========================================================*/

const main = () => {
  const SLL = new LinkedList();
  SLL.insertFirst('Apollo');
  SLL.insertFirst('Boomer');
  SLL.insertFirst('Helo');
  SLL.insertFirst('Husker');
  SLL.insertFirst('Starbuck');
  SLL.insertFirst('Tauhida');
  SLL.remove('squirrel');
  SLL.insertBefore('Athena', 'Boomer');
  SLL.insertAfter('Hotdog', 'Helo');
  SLL.insertAt('Kat', 3);
  SLL.remove('Tauhida');
  //   SLL.display();
  display(SLL);
  //   console.log('before reversal', display(SLL));
  //   console.log(reverseList(SLL.head));
  console.log('third from end is', findThirdFromEnd(SLL));
  //   console.log('after reversal', display(SLL));
  //   SLL.size();
  //   size();
  //   console.log('Empty list:', SLL.isEmpty());
  //   console.log('Empty list', isEmpty());
  //   console.log('Previous node is', SLL.findPrevious('Athena'));
  //   console.log('Previous node is', findPrevious('Athena'));
  //   console.log('Last node is', SLL.findLast());
  //   console.log('Last node is', findLast());
  //   return SLL;
};

main();

/* =========================================================
3. Supplemental functions for a linked lis

- Implement the following functions that operate on your linked list class. Note
  that these should be free functions instead of methods of the linked list class,
  so implement them outside the linked list class. 
  Test each function using the list created in exercise 1.

- display: displays the linked list
- size: returns the size of the linked list
- isEmpty: finds if the list is empty or not (without using the size() function)
- findPrevious: finds the node before the item you are looking for
- findLast: returns the last node in the linked list
=========================================================*/

function display(list) {
  let currentNode = list.head;
  while (currentNode !== null) {
    console.log(currentNode.value);
    currentNode = currentNode.next;
  }
}

function size(list) {
  let currentNode = list.head;
  let counter = 0;
  while (currentNode !== null) {
    counter++;
    currentNode = currentNode.next;
  }
  console.log('List size:', counter);
  return counter;
}
function isEmpty(list) {
  let currentNode = list.head;
  if (currentNode === null) {
    return true;
  }
  return false;
}
function findPrevious(list) {
  //start at first node
  let currentNode = list.head;
  //check if input (item) is equal to the next value
  //if not, advance the head
  while (item !== currentNode.next.value) {
    currentNode = currentNode.next;
  }
  //if it is, return current node
  return currentNode.value;
}
function findLast(list) {
  //start at first node
  let currentNode = list.head;
  //if next Node is not null, move to the next node
  while (currentNode.next !== null) {
    currentNode = currentNode.next;
  }
  //if next node is null, return the current node (indicates this is the last node)
  return currentNode.value;
}
//display: created and working
//size: created and working
//isEmpty: created and working
//findPrevious: created and working
//findLast: created and working

/* 
=========================================================
4. Mystery program

- Analyze the following function (without running it in an IDE) 
to determine what problem it is trying to solve. 
What is the time complexity of this algorithm?


function WhatDoesThisProgramDo(list) {
    //current = pointer
    let current = list.head;
    //loop through whole list beginning to end
    while (current !== null) {
        //each loop - assign newNode as the current node
      let newNode = current;
        //loop through all except for the last node
      while (newNode.next !== null) {
          //if the value of the next node (after new) is equal to the current value 
          //(identify if the value is after the newValue)
        if (newNode.next.value === current.value) {
            //assign two values ahead
          newNode.next = newNode.next.next;
        } else {
          newNode = newNode.next;
        }
      }
      current = current.next;
    }
  }
=========================================================
*/
//seems like it moves each node ahead by two? I'm lost in the sauce
//O(n^2) complexity because of nested loops

/* =========================================================
5. Reverse a list
- Write an algorithm to reverse a linked list. 
The time complexity of your algorithm should be linear (O(n)). 
For this exercise, notice we are not asking you just to print 
the linked list in reverse or use another linked list to store 
the value in reverse order. 
Your program should reverse the direction of a given singly linked list. 
In other words, all pointers should point backward. 
BONUS: Solve this problem using both recursive and iterative algorithms.
=========================================================*/
function reverseList(head) {
  //when next node is null (last item in list) return list
  if (!head || !head.next) {
    return head;
  }
  let tmp = reverseList(head.next);
  head.next.next = head;
  head.next = undefined;
  return tmp;
}

/* =========================================================
6. 3rd from the end

- Write an algorithm to find the 3rd element from the end of a linked list. 
Note You may be tempted to add a length property to your linked list class. 
The length property is not a typical property of linked list, 
therefore don't make any modification to the linked list class that is provided to you.
=========================================================*/

function findThirdFromEnd(list) {
  //current node at start
  let currentNode = list.head;
  console.log('currentNode is', currentNode);
  //currentNode +1
  let afterCurrentNode = list.head.next;
  if (
    //currentNode
    currentNode &&
    //currentNode+1
    afterCurrentNode &&
    //currentNode+2
    //all don't equal null
    afterCurrentNode.next !== null &&
    //afterCurrentNode+3 is null
    afterCurrentNode.next.next === null
  ) {
    //return currentNode
    console.log('third from end is', currentNode);
    return currentNode;
  }
  //current node goes up one
  currentNode = currentNode.next;
  console.log('next node up is', currentNode);
  return findThirdFromEnd(list);
}

/* 
=========================================================
7. Middle of a list

- Write an algorithm to find the middle element of a linked list. 
Note You may be tempted to add a length property to your linked list class. 
The length property is not a typical property of linked list, 
therefore don't make any modification to the linked list class that is provided to you. 
Also, finding the size of the linked list using the size() function and 
dividing it by half will not find the correct middle of the linked list. 
So, don't use either of these approaches.
=========================================================
*/

/* 
=========================================================
8. Cycle in a list

- Write an algorithm to find whether a linked list has a cycle 
i.e.:whether a node in the list has its next value pointing to an earlier node in the list). 
For this exercise, 
-create a linked list with the name CycleList. 
-Be sure to insert nodes in the list so that it has a cycle. 
-Then test your program with a cycleList function.
=========================================================
*/

/*
=========================================================
9. Doubly linked list

- Implement a doubly linked list. 
The primary functions of the doubly linked list would be 
--insert (First, Last, Before, After, and At), remove, and find. 
Write a function mainDLL, within in it....
--create the doubly linked list DLL 
--add the following items to it: Aquaria, Caprica, Gemenon, Picon, Sagittaron.
-- Add Tauron to the list
-- Remove Picon from the list
=========================================================
*/

/*
=========================================================
10. Reverse a DLL

- Given the doubly linked list above, 
write a program that reverses the doubly linked list. 
How is this implementation different than reversing the singly linked list?
=========================================================
*/
