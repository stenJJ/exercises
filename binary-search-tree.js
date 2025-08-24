class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  dfsRecursive() {
    const result = [];

    function traverse(node) {
      if (node === null) return;
      result.push(node.val);
      traverse(node.left);
      traverse(node.right);
    }

    traverse(this.root);
    return result;
  }

  dfsIterative() {
    const result = [];
    const stack = [];

    if (this.root) stack.push(this.root);

    while (stack.length > 0) {
      const current = stack.pop();
      result.push(current.val);
      if (current.right) stack.push(current.right);
      if (current.left) stack.push(current.left);
    }

    return result;
  }
}

module.exports = { BinarySearchTree, Node };
