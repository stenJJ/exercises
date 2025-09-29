class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // add a single vertex
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // add multiple vertices
  addVertices(vertexArray) {
    for (let v of vertexArray) this.addVertex(v);
  }

  // undirected edge: add each to the other's adjacency set
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // remove undirected edge
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // remove vertex and all incident edges
  removeVertex(vertex) {
    for (let neighbor of vertex.adjacent) {
      neighbor.adjacent.delete(vertex);
    }
    vertex.adjacent.clear();
    this.nodes.delete(vertex);
  }

  // DFS: return array of node values
  depthFirstSearch(start) {
    const visited = new Set();
    const out = [];

    function dfs(node) {
      if (visited.has(node)) return;
      visited.add(node);
      out.push(node.value);
      for (let nxt of node.adjacent) {
        if (!visited.has(nxt)) dfs(nxt);
      }
    }

    dfs(start);
    return out;
  }

  // BFS: return array of node values
  breadthFirstSearch(start) {
    const seen = new Set([start]); // track enqueued to avoid duplicates
    const out = [];
    const queue = [start];

    while (queue.length) {
      const node = queue.shift();
      out.push(node.value);
      for (let nxt of node.adjacent) {
        if (!seen.has(nxt)) {
          seen.add(nxt);
          queue.push(nxt);
        }
      }
    }
    return out;
  }
}

module.exports = { Graph, Node };
