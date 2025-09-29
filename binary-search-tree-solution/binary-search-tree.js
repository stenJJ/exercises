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

  insert(val) {
    const newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (true) {
      if (val < current.val) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  insertRecursively(val, current = this.root) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }

    if (val < current.val) {
      if (!current.left) {
        current.left = new Node(val);
      } else {
        this.insertRecursively(val, current.left);
      }
    } else {
      if (!current.right) {
        current.right = new Node(val);
      } else {
        this.insertRecursively(val, current.right);
      }
    }
    return this;
  }

  find(val) {
    let current = this.root;
    while (current) {
      if (val === current.val) return current;
      current = val < current.val ? current.left : current.right;
    }
    return undefined;
  }

  findRecursively(val, current = this.root) {
    if (!current) return undefined;
    if (val === current.val) return current;
    return val < current.val
      ? this.findRecursively(val, current.left)
      : this.findRecursively(val, current.right);
  }

  dfsPreOrder() {
    const visited = [];
    function traverse(node) {
      if (!node) return;
      visited.push(node.val);
      traverse(node.left);
      traverse(node.right);
    }
    traverse(this.root);
    return visited;
  }

  dfsInOrder() {
    const visited = [];
    function traverse(node) {
      if (!node) return;
      traverse(node.left);
      visited.push(node.val);
      traverse(node.right);
    }
    traverse(this.root);
    return visited;
  }

  dfsPostOrder() {
    const visited = [];
    function traverse(node) {
      if (!node) return;
      traverse(node.left);
      traverse(node.right);
      visited.push(node.val);
    }
    traverse(this.root);
    return visited;
  }

  bfs() {
    const visited = [];
    const queue = [this.root];
    while (queue.length) {
      const node = queue.shift();
      if (node) {
        visited.push(node.val);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
    }
    return visited;
  }
}

module.exports = BinarySearchTree;
