export class IterableList<T = any> {
    list: T[] = [];
  
    index = 0;
  
    constructor(...args: T[]) {
      this.list = args;
    }

    get(i: number) {
        return this.list[i];
    }

    hasNext(): boolean {
        return this.index < this.list.length;
    }

    next(): T {
        return this.list[this.index++];
    }
}
