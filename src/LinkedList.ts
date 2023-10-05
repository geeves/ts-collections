class LinkedList<T> {

  private first: LinkedListNode<T> | null = null;
  private last: LinkedListNode<T> | null = null;
  private size: number = 0;
  private modCount: number = 0;

  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
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
      console.log(`Adding ${newNode.item}`)
      this.first = newNode;
    } else {
      // @ts-ignore
      console.log(`Updating Last ${newNode.item}`)
      last.next = newNode;
    }
    this.size++;
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
    this.size++;
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

  public peek(): T | null {
    const first: LinkedListNode<T> | null = this.first;
    return (first === null) ? null : first.item;
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
    this.size--;
    this.modCount++;
    return element;
  }


  private unlinkLast(l: LinkedListNode<T>): T | null {
    const element: T | null = l.item;
    const prev: LinkedListNode<T> | null = l.prev;
    l.item = null;
    l.prev = null; // help GC
    this.last = prev;
    if (prev == null) {
      this.first = null;
    } else {
      prev.next = null;
    }
    this.size--;
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
    this.size--;
    this.modCount++;
    return element;
  }

  public getSize(): number {
    return this.size;
  }

  public length(): number {
    return this.getSize();
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

  public indexOf(value: T): number {
    let index: number = 0;
    console.log(`value is ${value}`)
    if (null === value) {
      console.log("Null")
      let x: LinkedListNode<T> | null = this.first;
      while (x !== null) {
        console.log(x.item);
        if (null === x.item) {
          return index;
        }
        x = x.next
        index++;
      }
    } else {
      console.log("Not Null")
      let x = this.first;
      console.log(x);
      while (x !== null) {
        console.log(x.item);
        if (value === x.item) {
          return index;
        }
        x = x.next
        index++;
      }
    }

    return -1;
  }

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

export default LinkedList;
