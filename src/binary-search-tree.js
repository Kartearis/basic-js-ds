const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');
const {assert} = require("chai");

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  rootNode = null;

  root() {
    return this.rootNode;
  }

  add(data) {
    if (this.rootNode === null)
      this.rootNode = new Node(data);
    else {
      let targetNode = this.rootNode;
      let flag = false;
      while (!flag) {
        if (data < targetNode.data)
          if (targetNode.left === null) {
            targetNode.left = new Node(data);
            flag = true;
          } else {
            targetNode = targetNode.left;
          }
        else if (data > targetNode.data) {
          if (targetNode.right === null) {
            targetNode.right = new Node(data);
            flag = true;
          } else {
            targetNode = targetNode.right;
          }
        }
      }

    }

  }

  has(data) {
    let node = this.rootNode;
    if (node === null) return false;
    if (node.data === data) return true;
    while (node !== null)
    {
      if (node.data === data) return true;
      if (data < node.data)
        node = node.left;
      else node = node.right;
    }
    return false;
  }

  find(data) {
    let node = this.rootNode;
    if (node === null) return null;
    if (node.data === data) return node;
    while (node !== null)
    {
      if (node.data === data) return node;
      if (data < node.data)
        node = node.left;
      else node = node.right;
    }
    return null;
  }

  remove(data) {
    let toRemove = null;
    let parent = null;
    let side = null;
    let node = this.rootNode;
    if (node === null) return;
    while (node !== null)
    {
      if (node.data === data) {
        toRemove = node;
        break;
      }
      if (data < node.data) {
        parent = node;
        side = "left";
        node = node.left;
      }
      else {
        parent = node;
        side = "right";
        node = node.right;
      }
    }
    if (toRemove === null) return;
    if (toRemove.left === null && toRemove.right === null)
      if (parent !== null) parent[side] = null;
      else this.rootNode = null;
    else if (toRemove.left === null || toRemove.right === null)
      if (parent !== null) parent[side] = toRemove.left ? toRemove.left : toRemove.right;
      else this.rootNode = toRemove.left ? toRemove.left : toRemove.right;
    else {
      let targetNode = toRemove.right;
      let parent2 = toRemove;
      let side2 = "right";

      while (targetNode.left !== null)
      {
        parent2 = targetNode;
        side2 = "left";
        targetNode = targetNode.left;
      }
      toRemove.data = targetNode.data;
      if (targetNode.right === null)
        parent2[side2] = null;
      else
        parent2[side2] = targetNode.right;
    }
  }

  min() {
    let targetNode = this.rootNode;
    if (targetNode === null ) return null;
    while (targetNode.left !== null)
      targetNode = targetNode.left;
    return targetNode.data;
  }

  max() {
    let targetNode = this.rootNode;
    if (targetNode === null ) return null;
    while (targetNode.right !== null)
      targetNode = targetNode.right;
    return targetNode.data;
  }
}

module.exports = {
  BinarySearchTree
};
