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

  // get levelOrder() {
  //   let queue = [];
  //   this.#appendToqueue(this.#root, queue);

  //   queue.forEach((node) => console.log(node.data));
  // }

  // #appendToqueue(node, queue) {
  //   if (node === null) return queue;
  //   queue.push(node);

  //   this.#appendToqueue(node.left, queue);
  //   this.#appendToqueue(node.right, queue);
  // }
}

let bin = new BinarySearchTree([1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]);
bin.viewTree;

console.log("\n\n\n");

bin.delete(8);
bin.viewTree;
