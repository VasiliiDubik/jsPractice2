// const animal = {
//   name: "Animal",
//   age: 5,
//   hasTail: true,
// };

// class Animal {
//   static voiceFather() {
//     console.log("ANIMAL!!");
//   }

//   constructor(options) {
//     this.name = options.name;
//     this.age = options.age;
//     this.hasTail = options.hasTail;
//   }

//   voice() {
//     console.log(`I am ${this.name}`);
//   }
// }

// const animal = new Animal({
//   name: "Animal",
//   age: 5,
//   hasTail: true,
// });

// const arr = [1, 2, 3, 4, 5];

// class Cat extends Animal {
//   static catHey() {
//     console.log("MIAY");
//   }

//   get ageInfo() {
//     return this.age;
//   }

//   set ageInfo(newAge) {
//     this.age = newAge;
//   }

//   constructor(options) {
//     super(options);
//     this.color = options.color;
//   }
//   voice() {
//     console.log("MYAU");
//   }
// }

// const cat = new Cat({
//   name: "Cat",
//   age: 7,
//   hasTail: true,
//   color: "black",
// });

// class Component {
//   constructor(selector) {
//     this.el = document.querySelector(selector);
//   }

//   hide() {
//     this.el.style.display = "none";
//   }

//   show() {
//     this.el.style.display = "block";
//   }
// }

// class Box extends Component {
//   constructor(options) {
//     super(options.selector);

//     this.el.style.width = this.el.style.height = options.size + "px";
//     this.el.style.background = options.color;
//   }

//   changeColor(color) {
//     this.el.style.background = color;
//   }
// }

// const box1 = new Box({
//   selector: "#box1",
//   size: 100,
//   color: "red",
// });

// class Node {
//   constructor(data) {
//     this.data = data;
//     this.left = null;
//     this.right = null;
//   }
// }

// class BinarySearchThree {
//   constructor() {
//     this.rootNode = null;
//   }
//   root() {
//     return this.rootNode;
//   }

//   add(data) {
//     const newNode = new Node(data);
//     console.log(newNode);

//     if (!this.rootNode) {
//       this.rootNode = newNode;
//       return;
//     }

//     while (true) {
//       if (data < currentNode.data) {
//         if (!currentNode.left) {
//           currentNode.left = newNode;
//           break;
//         }
//         currentNode = currentNode.left;
//       } else {
//         if (!currentNode.right) {
//           currentNode.right = newNode;
//           break;
//         }
//         currentNode = currentNode.right;
//       }
//     }
//   }

//   has(data) {
//     let current = this.rootNode;
//     while (current) {
//       if (data === current.data) {
//         return true;
//       }
//       current = data < current.data ? current.left : current.right;
//     }
//     return false;
//   }

//   find(data) {
//     let current = this.rootNode;
//     while (current) {
//       if (data === current.data) {
//         return current;
//       }
//       current = data < current.data ? current.left : current.right;
//     }
//     return null;
//   }

//   remove(data) {
//     this.rootNode = this._removeNode(this.rootNode, data);
//   }

//   _removeNode(node, data) {
//     if (!node) return null;
//     if (data < node.data) {
//       node.left = this._removeNode(node.left, data);
//     } else if (data > node.data) {
//       node.right = this._removeNode(node.left, data);
//     } else {
//       if (!node.left && !node.right) {
//         return null;
//       } else if (!node.left) {
//         return node.right;
//       } else if (!node.right) {
//         return node.left;
//       } else {
//         const minRight = this._findMin(node.right);
//         node.data = minRight.data;
//         node.right = this._removeNode(node.right, minRight.data);
//       }
//     }
//     return node;
//   }

//   min() {
//     if (!this.rootNode) return null;
//     return this._findMin(this.rootNode).data;
//   }

//   _findMin(node) {
//     while (node.left) {
//       node = node.left;
//     }
//     return node;
//   }

//   max() {
//     if (!this.rootNode) return null;
//     let current = this.rootNode;
//     while (current.right) {
//       current = current.right;
//     }

//     return current.data;
//   }
// }

// const three = new BinarySearchThree();
// console.log(three.add(13));
