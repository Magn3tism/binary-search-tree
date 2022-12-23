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
      console.log(reqdNode);
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
}

let bin = new BinarySearchTree([1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]);
bin.viewTree;

bin.insert(6);
bin.viewTree;
