const Node = require("./Node");

class BinarySearchTree {
  #root;

  constructor(array) {
    this.#root = this.#buildTree(array, 0, array.length - 1);
  }

  #buildTree(array, start, end) {
    if (start > end) return null;

    let mid = parseInt((start + end) / 2);
    const root = new Node(array[mid]);

    root.left = this.#buildTree(array, start, mid - 1);

    root.right = this.#buildTree(array, mid + 1, end);

    return root;
  }

  #prettyPrint(node, prefix = "", isLeft = true) {
    if (node.right !== null) {
      this.#prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└──> " : "┌──> "}${node.data}`);
    if (node.left !== null) {
      this.#prettyPrint(
        node.left,
        `${prefix}${isLeft ? "    " : "│   "}`,
        true
      );
    }
  }

  get viewTree() {
    this.#prettyPrint(this.#root);
  }

  insert(value) {
    let newNode = new Node(value);
    let reqdNode = this.#root;

    while (1) {
      if (newNode.data > reqdNode.data) {
        if (reqdNode.right === null) {
          reqdNode.right = newNode;
          break;
        }
        reqdNode = reqdNode.right;
      } else {
        if (reqdNode.left === null) {
          reqdNode.left = newNode;
          break;
        }
        reqdNode = reqdNode.left;
      }
    }
  }

  delete(value, node = this.#root) {
    if (node === null) return node;

    if (value < node.data) node.left = this.delete(value, node.left);
    else if (value > node.data) node.right = this.delete(value, node.right);
    else {
      if (node.right === null && node.left === null) return null;
      else if (node.right === null) return node.left;
      else if (node.left === null) return node.right;
      else {
        node.data = this.#inorderSuccessor(node.right).data;

        node.right = this.delete(node.data, node.right);
      }
    }

    return node;
  }

  #inorderSuccessor(node) {
    if (node.left === null) {
      return node;
    }

    return this.#inorderSuccessor(node.left);
  }

  find(value) {
    let node = this.#root;

    while (1) {
      if (value === node.data) {
        return node;
      } else if (node.left === null && node.right === null) {
        return `${value} not in Tree`;
      } else if (value < node.data) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
  }

  levelOrder(cb = "") {
    if (this.#root === null) return;

    let queue = [];
    let returnArray = [];

    queue.push(this.#root);

    while (queue.length) {
      let current = queue[0];

      if (cb) cb(current);
      else returnArray.push(current);

      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
      queue.shift();
    }

    if (!cb) return returnArray;
  }

  preOrder(cb = "") {
    if (this.#root === null) return;

    let queue = [];
    this.#preOrderTraversel(this.#root, queue);
    if (cb) {
      queue.forEach((node) => cb(node));
    } else {
      queue = queue.map((node) => node.data);
      return queue;
    }
  }

  #preOrderTraversel(node, queue) {
    if (node === null) return node;

    queue.push(node);
    this.#preOrderTraversel(node.left, queue);
    this.#preOrderTraversel(node.right, queue);

    return queue;
  }

  inOrder(cb = "") {
    let queue = [];

    this.#inOrderTraversel(this.#root, queue);

    if (cb) {
      queue.forEach((node) => cb(node));
    } else {
      queue = queue.map((node) => node.data);
      return queue;
    }
  }

  #inOrderTraversel(node, queue) {
    if (node === null) return;

    this.#inOrderTraversel(node.left, queue);
    queue.push(node);
    this.#inOrderTraversel(node.right, queue);
  }

  postOrder(cb = "") {
    let queue = [];

    this.#postOrderTraversel(this.#root, queue);

    if (cb) {
      queue.forEach((node) => cb(node));
    } else {
      queue = queue.map((node) => node.data);
      return queue;
    }
  }

  #postOrderTraversel(node, queue) {
    if (node === null) return;

    this.#postOrderTraversel(node.left, queue);
    this.#postOrderTraversel(node.right, queue);
    queue.push(node);
  }

  height(node = this.#root) {
    if (node === null) return 0;

    let lheight = this.height(node.left);
    let rheight = this.height(node.right);

    if (lheight > rheight) return lheight + 1;
    else return rheight + 1;
  }

  isBalanced(node = this.#root) {
    if (node === null) return true;
    let lh = this.height(node.left);
    let rh = this.height(node.right);
    if (
      Math.abs(lh - rh) <= 1 &&
      this.isBalanced(node.left) == true &&
      this.isBalanced(node.right) == true
    )
      return true;
    return false;
  }

  rebalance() {
    let newArray = this.inOrder();
    console.log(newArray);

    this.#root = this.#buildTree(newArray, 0, newArray.length - 1);
  }
}

let bin = new BinarySearchTree([1, 3, 4, 5, 8, 6, 7, 8, 23, 324, 6345]);

bin.viewTree;
console.log(bin.isBalanced());
console.log(bin.inOrder());

bin.insert(32);
bin.insert(52);
bin.insert(9);
bin.insert(29);
bin.insert(10);
bin.insert(34);
bin.insert(67);
bin.insert(88);
bin.insert(83);
bin.insert(98);
bin.insert(100);
bin.insert(1009);

bin.viewTree;
console.log(bin.isBalanced());

bin.rebalance();

bin.viewTree;
console.log(bin.isBalanced());
