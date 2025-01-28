class Nodule<T> {

  left: Nodule<T> | null = null; // smaller
  right: Nodule<T> | null = null; // larger
  item: T;

  constructor(item: T) {
    this.item = item;
  }

}
