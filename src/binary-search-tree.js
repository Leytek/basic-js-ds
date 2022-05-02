const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  #root = null;
  #currentNode;
  #previousNode;

  #descendTo(data, node = this.#root) {
    this.#currentNode = node;
      while(true)
        if(this.#currentNode.data < data)
          if(this.#currentNode.right)
            [this.#currentNode, this.#previousNode] = [this.#currentNode.right, this.#currentNode];
          else break;
        else if(this.#currentNode.data > data)
          if(this.#currentNode.left)
          this.#currentNode = this.#currentNode.left;
          else break;
        else break;
    return this.#currentNode;
  }

  root() {
    return this.#root;
  }

  add(data) {
    if(this.#root)
      if(this.#descendTo(data).data < data)
        this.#currentNode.right = new Node(data);
      else if(this.#currentNode.data > data)
        this.#currentNode.left = new Node(data);
      else return;
    else
      this.#root = new Node(data);
  }

  has(data) {
    return !!this.find(data);
  }

  find(data) {
    if(this.#root)
      if(this.#descendTo(data).data === data)
        return this.#currentNode;
    return null;
  }

  remove(data) {
    if(this.#root) {
      console.log(this.#root);
      this.#descendTo(data);
      let current = this.#currentNode, prev;
      if(current.right === null)
        prev = current.left;
      else {
        prev = current.right;
        this.#descendTo(-Infinity, this.#currentNode.right).left = current.left;
      }
      if(current === this.#root)
        this.#root = prev;
      else if(current === this.#previousNode.right)
        this.#previousNode.right = prev;
      else
        this.#previousNode.left = prev;
    }
  }

  min() {
    if(this.#root)
      return this.#descendTo(-Infinity).data;
    return null;
  }

  max() {
    if(this.#root)
      return this.#descendTo(+Infinity).data;
    return null;
  }
}

module.exports = {
  BinarySearchTree
};
