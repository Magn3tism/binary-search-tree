const Node = require("./Node");

class BinarySearchTree {
  buildTree(array, start, end) {
    if (start > end) return null;

    let mid = parseInt((start + end) / 2);
    const root = new Node(array[mid]);

    root.left = this.buildTree(array, start, mid - 1);

    root.right = this.buildTree(array, mid + 1, end);

    return root;
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

let bin = new BinarySearchTree();
let root = bin.buildTree([1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345], 0, 10);
console.log(bin.prettyPrint(root));
// console.log(root);
