import Utils from "./Utils";

class TreeSet<T> {

  root: TreeNode<T> | null = null;
  treeSize: number = 0;

  constructor(p: any, p1: any, p2: any, p3: any) {

  }

  private height(tn: TreeNode<T>): number {
    if (undefined === tn || null === tn) {
      return 0;
    }

    // @ts-ignore
    const heightLeft: number = this.height(tn.left);
    // @ts-ignore
    const heightRight: number = this.height(tn.right);

    if (heightLeft === -1 || heightRight === -1)  {
      return -1;
    }
    if (Math.abs(heightLeft - heightRight) > 1)  {
      return -1;
    }
    return Math.max(heightLeft, heightRight) + 1;
  }

  public isBalanced(root: TreeNode<T>): boolean {
    if (undefined === root || null === root) {
      return true;
    }
    return this.height(root) !== -1;
  }

  public add(value: T): void {
    if (undefined === value || null === value) {
      throw Error("TreeNode Must have Value");
    }
    // @ts-ignore
    this.root = this.addRecursive(this.root, value);
    this.treeSize++;
    // balance tree
  }

  private addRecursive(current: TreeNode<T>, value: T): TreeNode<T> {
    if (undefined === current || null === current) {
      // @ts-ignore
      return new TreeNode<T>(value);
    }

    const index: number = Utils.hashCode(value);

    if (index < current.index) {
      // console.log("Left Adding " + Utils.toString(value));
      // @ts-ignore
      current.left = this.addRecursive(current.left, value);
    } else if (index > current.index) {
      console.log("Adding Right " + Utils.toString(value));
      // @ts-ignore
      current.right = this.addRecursive(current.right, value);
    }

    return current;
  }

  private getValue(current: TreeNode<T>, index: number, value: T): T | undefined {
    // console.log(index);
    // console.log(value);
    if (index < current.index) {
      // @ts-ignore
      current.left = this.getValue(current.left, value);
    } else if (index > current.index) {
      // @ts-ignore
      current.right = this.getValue(current.right, value);
    }

    return current.valueList.find((k: T) => k === value);
  }

  public get(value: T): T | undefined {
    const index: number = Utils.hashCode(value);

    // @ts-ignore
    return this.getValue(this.root, index, value);
  }

  private hasValue(current: TreeNode<T>, value: T): boolean {
    const index: number = Utils.hashCode(value);
    if (undefined === current || null === current) {
      return false;
    }
    if (index === current.index) {
      return current.valueList.filter(x => value === x).length > 0;
    }
    // @ts-ignore
    return index < current.index ?
      // @ts-ignore
      this.hasValue(current.left, value) :
      // @ts-ignore
      this.hasValue(current.right, value);
  }

  public containsValue(value: T): boolean {
    // @ts-ignore
    return this.hasValue(this.root, value);
  }

  public balance(root: TreeNode<T> | null): TreeNode<T> | null {
    const nodeArr: TreeNode<T>[] = [];
    function traverse(tn: TreeNode<T> | null) {
      if (!tn) {
        return;
      }
      traverse(tn.left);
      tn.left = null;
      nodeArr.push(tn);
      traverse(tn.right);
      tn.right = null;
    }
    traverse(root);

    function construct(nodes: TreeNode<T>[]): TreeNode<T> | null {
      if (!nodes.length) {
        return null;
      }
      const centerIndex: number = Math.floor(nodes.length / 2);
      const centerNode: TreeNode<T> = nodes[centerIndex];
      const leftArr: TreeNode<T>[] = nodes.slice(0, centerIndex);
      const rightArr: TreeNode<T>[] = nodes.slice(centerIndex + 1);
      centerNode.left = construct(leftArr);
      centerNode.right = construct(rightArr);
      return centerNode;
    }

    return construct(nodeArr);
  };

}



class TreeNode<T> {
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;
  parent: TreeNode<T> | null = null;

  valueList: T[] = new Array(7); // resize like hashset, but not key value
  index: number = 0;

  constructor(value: T, left: TreeNode<T>, right: TreeNode<T>) {
    if (undefined === value || null === value) {
    } else {
      this.valueList.push(value);
      this.index = Utils.hashCode(value);
    }

    this.left = undefined === left ? null : left;
    this.right = undefined === right ? null : right;
  }
}

export default TreeSet;

