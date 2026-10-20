'use strict';

console.log('CAMPUS IT SUPPORT REQUEST MANAGER');

// ================================================================
// PART A: STACK
// ================================================================
class Stack {
  constructor() {
    // storage ng stack
    this.items = [];
  }

  push(element) {
    // lagay sa taas
    this.items.push(element);
  }

  pop() {
    // tanggalin yung nasa taas
    if (this.items.length === 0) {
      return undefined;
    }
    return this.items.pop();
  }

  peek() {
    // tingnan lang yung nasa taas
    if (this.items.length === 0) {
      return undefined;
    }
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    // check kung wala ng laman
    return this.items.length === 0;
  }

  size() {
    // bilang ng laman
    return this.items.length;
  }

  toString() {
    // gawing text lahat
    return this.items.join(', ');
  }
}

console.log('\nPART A: UNDO HISTORY');
const actionHistory = new Stack();

actionHistory.push('Opened Ticket #101');
actionHistory.push('Assigned Ticket #101');
actionHistory.push('Closed Ticket #101');

console.log('Top Action: ' + actionHistory.peek());
console.log('Undo Action: ' + actionHistory.pop());
console.log('Remaining Actions: ' + actionHistory.toString());
console.log('Stack Size: ' + actionHistory.size());


// ================================================================
// PART B: QUEUE
// ================================================================
class Queue {
  constructor() {
    // storage ng queue
    this.items = [];
  }

  enqueue(element) {
    // dagdag sa dulo
    this.items.push(element);
  }

  dequeue() {
    // tanggalin sa unahan
    if (this.items.length === 0) {
      return undefined;
    }
    return this.items.shift();
  }

  front() {
    // tingnan yung nasa unahan
    if (this.items.length === 0) {
      return undefined;
    }
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  toString() {
    return this.items.join(', ');
  }
}

console.log('\nPART B: WAITING REQUESTS');
const waitingRequests = new Queue();

waitingRequests.enqueue('Ticket #201 - Password Reset');
waitingRequests.enqueue('Ticket #202 - No Internet');
waitingRequests.enqueue('Ticket #203 - Printer Problem');
waitingRequests.enqueue('Ticket #204 - Software Installation');

console.log('Next Request: ' + waitingRequests.front());
console.log('Processed: ' + waitingRequests.dequeue());
console.log('Processed: ' + waitingRequests.dequeue());
console.log('Remaining Requests: ' + waitingRequests.toString());
console.log('Queue Size: ' + waitingRequests.size());


// ================================================================
// PART C: PRIORITY QUEUE
// ================================================================
class PriorityQueue {
  constructor() {
    // lagayan ng may priority
    this.items = [];
  }

  enqueue(request, priority) {
    // gawa ng object na may request at priority
    let newItem = {
      request: request,
      priority: priority
    };

    // hanapin saan dapat ilagay
    // mas maliit na number mas importante
    let added = false;
    for (let i = 0; i < this.items.length; i++) {
      if (newItem.priority < this.items[i].priority) {
        // isingit dito
        this.items.splice(i, 0, newItem);
        added = true;
        break;
      }
    }

    // pag hindi pa nalagay, sa dulo na
    if (added == false) {
      this.items.push(newItem);
    }
  }

  dequeue() {
    // kunin yung pinaka una (pinaka importante)
    if (this.items.length === 0) {
      return undefined;
    }
    return this.items.shift();
  }

  size() {
    return this.items.length;
  }

  print() {
    // ipakita lahat
    for (let i = 0; i < this.items.length; i++) {
      console.log(this.items[i].request + ', Priority ' + this.items[i].priority);
    }
  }
}

console.log('\nPART C: URGENT REQUESTS');
const urgentRequests = new PriorityQueue();

urgentRequests.enqueue('Ticket #301 - Install Browser', 3);
urgentRequests.enqueue('Ticket #302 - Server Offline', 1);
urgentRequests.enqueue('Ticket #303 - Faculty PC Failure', 2);
urgentRequests.enqueue('Ticket #304 - Internet Laboratory Down', 1);

console.log('Initial Priority Order:');
urgentRequests.print();

let first = urgentRequests.dequeue();
console.log('');
console.log('Processed Priority Request: ' + first.request + ', Priority ' + first.priority);
console.log('Remaining Priority Requests:');
urgentRequests.print();


// ================================================================
// PART D: LINKED LIST
// ================================================================
class Node {
  constructor(element) {
    // laman ng node
    this.element = element;
    // next ay wala muna
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    // haba at head
    this.length = 0;
    this.head = null;
  }

  append(element) {
    // magdagdag sa dulo
    let node = new Node(element);
    if (this.head == null) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next != null) {
        current = current.next;
      }
      current.next = node;
    }
    this.length++;
  }

  insert(position, element) {
    // check kung valid yung position
    if (position < 0 || position > this.length) {
      return false;
    }

    let node = new Node(element);

    if (position == 0) {
      // sa unahan ilagay
      node.next = this.head;
      this.head = node;
    } else {
      let current = this.head;
      let previous = null;
      let index = 0;
      while (index < position) {
        previous = current;
        current = current.next;
        index++;
      }
      node.next = current;
      previous.next = node;
    }
    this.length++;
    return true;
  }

  removeAt(position) {
    // check kung valid
    if (position < 0 || position >= this.length) {
      return undefined;
    }

    let current = this.head;

    if (position == 0) {
      this.head = current.next;
    } else {
      let previous = null;
      let index = 0;
      while (index < position) {
        previous = current;
        current = current.next;
        index++;
      }
      previous.next = current.next;
    }
    this.length--;
    return current.element;
  }

  indexOf(element) {
    // hanapin yung element
    let current = this.head;
    let index = 0;
    while (current != null) {
      if (current.element == element) {
        return index;
      }
      current = current.next;
      index++;
    }
    return -1;
  }

  remove(element) {
    // gamitin yung indexOf at removeAt
    let pos = this.indexOf(element);
    if (pos != -1) {
      return this.removeAt(pos);
    }
    return undefined;
  }

  isEmpty() {
    return this.length == 0;
  }

  size() {
    return this.length;
  }

  toString() {
    // kunin lahat ng laman
    let current = this.head;
    let result = [];
    while (current != null) {
      result.push(current.element);
      current = current.next;
    }
    return result.join('\n');
  }
}

console.log('\nPART D: COMPLETED REQUESTS');
const completedRequests = new LinkedList();

completedRequests.append('Ticket #401 - Account Activated');
completedRequests.append('Ticket #402 - Printer Connected');
completedRequests.append('Ticket #403 - Antivirus Updated');

completedRequests.insert(0, 'Ticket #400 - Computer Diagnosed');
completedRequests.insert(completedRequests.size(), 'Ticket #405 - Browser Updated');

console.log('Complete List:');
console.log(completedRequests.toString());

console.log('');
console.log('Index of Ticket #402 - Printer Connected: ' + completedRequests.indexOf('Ticket #402 - Printer Connected'));
console.log('Removed at Position 1: ' + completedRequests.removeAt(1));
console.log('Removed by Value: ' + completedRequests.remove('Ticket #403 - Antivirus Updated'));

console.log('');
console.log('Final List:');
console.log(completedRequests.toString());
console.log('Final Size: ' + completedRequests.size());