/**
 * A LinkedList implementation based largely on
 * Java's LinkedList
 */
class LinkedList<T> {

  private first: LinkedListNode<T> | null = null;
  private last: LinkedListNode<T> | null = null;
  private listSize: number = 0;
  private modCount: number = 0;

  constructor() {
    this.first = null;
    this.last = null;
    this.listSize = 0;
    this.modCount = 0;
  }

  public add(value: T): boolean {
    this.linkLast(value);
    return true;
  }

  private linkLast(value: T): void {
    const last: LinkedListNode<T> | null = this.last;
    const first: LinkedListNode<T> | null = this.first;
    const newNode: LinkedListNode<T> = new LinkedListNode<T>(last, value, null);
    this.last = newNode;
    if (last === null) {
      // console.log(`Adding ${newNode.item}`)
      this.first = newNode;
    } else {
      // @ts-ignore
      // console.log(`Updating Last ${newNode.item}`)
      last.next = newNode;
    }
    this.listSize++;
    this.modCount++;
  }

  public addFirst(value: T): void {
    const first: LinkedListNode<T> | null = this.first;
    const newNode: LinkedListNode<T> = new LinkedListNode<T>(null, value, first);
    this.first = newNode;
    if (null === first) {
      this.last = newNode;
    } else {
      first.prev = newNode;
    }
    this.listSize++;
    this.modCount++;
  }

  public addLast(value: T): void {
    this.linkLast(value);
  }

  public getFirst(): T | null {
    const first: LinkedListNode<T> | null = this.first;
    if (null === first) {
      throw new Error();
    }
    return first.item;
  }

  public getLast(): T | null {
    const last: LinkedListNode<T> | null = this.last;
    if (null === last) {
      throw new Error();
    }
    return last.item;
  }

  public removeFirst(): T | null {
    const first: LinkedListNode<T> | null = this.first;
    if (null === first) {
      throw new Error();
    }
    return this.unlinkFirst(first);
  }

  public removeLast(): T | null {
    const last: LinkedListNode<T> | null = this.last;
    if (null === last) {
      throw new Error();
    }
    return this.unlinkLast(last);
  }

  public peek(): T | null {
    const first: LinkedListNode<T> | null = this.first;
    return (first === null) ? null : first.item;
  }

  public remove(x: LinkedListNode<T>) : T | null {
    return this.unlink(x);
  }

  private unlinkFirst(f: LinkedListNode<T>): T | null {
    const element: T | null = f.item;
    const next: LinkedListNode<T> | null = f.next;
    f.item = null;
    f.next = null; // help GC
    this.first = next;
    if (next === null) {
      this.last = null;
    } else {
      next.prev = null;
    }
    this.listSize--;
    this.modCount++;
    return element;
  }


  private unlinkLast(l: LinkedListNode<T>): T | null {
    const element: T | null = l.item;
    const prev: LinkedListNode<T> | null = l.prev;
    l.item = null;
    l.prev = null;
    this.last = prev;
    if (null === prev) {
      this.first = null;
    } else {
      prev.next = null;
    }
    this.listSize--;
    this.modCount++;
    return element;
  }


  private unlink(x: LinkedListNode<T>): T | null {
    const element: T | null = x.item;
    const next: LinkedListNode<T> | null = x.next;
    const prev: LinkedListNode<T> | null = x.prev;

    if (prev === null) {
      this.first = next;
    } else {
      prev.next = next;
      x.prev = null;
    }

    if (next === null) {
      this.last = prev;
    } else {
      next.prev = prev;
      x.next = null;
    }

    x.item = null;
    this.listSize--;
    this.modCount++;
    return element;
  }

  public size(): number {
    return this.listSize;
  }

  public length(): number {
    return this.size();
  }

  public static of(...args: any[]): LinkedList<any> {
    const list: LinkedList<any> = new LinkedList<any>();

    for (let i = 0; i < args.length; i++) {
      list.add(args[i]);
    }

    return list;
  }

  public contains(o: T): boolean {
    return this.indexOf(o) >= 0;
  }

  public get(i: number): T | null {
    let idx: number = 0;
    let x: LinkedListNode<T> | null = this.first;
    if (i >= this.listSize || 0 > i) {
      throw new Error("IndexOutOfBoundsError");
    }
    while(x !== null) {
      if (i === idx) {
        return x.item;
      }
      x = x.next;
      idx++;
    }
    return null;
  }

  public getByValue(s: string): LinkedListNode<T> | null {
    let idx: number = 0;
    let x: LinkedListNode<T> | null = this.first;
    while(x !== null) {
      if (s === x.item) {
        return x;
      }
      x = x.next;
      idx++;
    }
    return null;
  }

  public indexOf(value: T): number {
    let index: number = 0;
    if (null === value) {
      let x: LinkedListNode<T> | null = this.first;
      while (x !== null) {
        if (null === x.item) {
          return index;
        }
        x = x.next
        index++;
      }
    } else {
      let x = this.first;
      while (x !== null) {
        if (value === x.item) {
          return index;
        }
        x = x.next
        index++;
      }
    }
    return -1;
  }

  public reverse(): void {
    const f: LinkedListNode<T> | null = this.first;
    this.first = this.last;
    this.reverseList(f);
    this.last = f;
    this.modCount++;
  }

  // Next: B    C    D    _
  // Node: A -> B -> C -> D
  // Prev: _    A    B    C

  // Next: _    A    B    C
  // Node: A -> B -> C <- D
  // Prev: B    C    D    _

  private reverseList(head: LinkedListNode<T> | null): void {
    if (null === head) {
      return;
    }
    const n: LinkedListNode<T> | null = head.next;

    head.next = head.prev;
    head.prev = n;
    return this.reverseList(n)
  }

  public toString(): string {
    let x = this.first;
    let a = new Array(this.size());
    let i = 0;
    while (null !== x) {
      a[i] = x.item
      x = x.next
      i++
    }
    return a.toString();
  }  
  
  // public filter<T extends object>(
  //   obj: LinkedListNode<T>,
  //   fn: (entry: Entry<T>, i: number, arr: Entry<T>[]) => boolean
  // ) {
  //   return Object.fromEntries(
  //     (Object.entries(obj) as Entry<T>[]).filter(fn)
  //   ) as Partial<T>
  // }

}


class LinkedListNode<T> {
  item: T | null = null;
  next: LinkedListNode<T> | null = null;
  prev: LinkedListNode<T> | null = null;

  constructor(prev: LinkedListNode<T> | null, item: T, next: LinkedListNode<T> | null) {
    this.next = next;
    this.prev = prev;
    this.item = item;
  }

  public getItem(): T | null {
    return this.item;
  }

  public getPrev(): LinkedListNode<T> | null {
    return this.prev;
  }

  public getNext(): LinkedListNode<T> | null {
    return this.next;
  }
}

export {LinkedListNode};
export default LinkedList;
