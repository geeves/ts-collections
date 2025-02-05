class HashSet<T, E> {

    table: any[] = new Array(3);
    numItems: number = 0;
    MAX_LOAD_FACTOR: number = 0.80;

    constructor(size: number | null) {
        if (null !== size) {
            this.table = new Array(size);
        }
    }

    public size(): number {
        return this.numItems;
    }

    protected resize2(): void {
        const newTable: any[] = new Array(this.table.length * 2);
        this.table
            .filter(item => undefined !== item && null !== item)
            .forEach(([key, value]) => {
                    const idx: number = this.hashCode(key);
                    if (newTable[idx]) {
                        newTable[idx].push([key, value]);
                    } else {
                        newTable[idx] = [[key, value]];
                    }
                }
            );
    }

    private resize(): void {
        const newTable: any[] = new Array(this.table.length * 2);
        this.table.forEach(item => {
            if (item) {
                // @ts-ignore
                item.forEach(([key, value]) => {
                    const idx: number = this.hashCode(key);
                    if (newTable[idx]) {
                        newTable[idx].push([key, value]);
                    } else {
                        newTable[idx] = [[key, value]];
                    }
                });
            }
        });
        this.table = newTable;
    }

    public put(key: T, value: E): void {
        if (undefined === key || null === key) {
            throw Error("Key cannot be NULL or Undefined")
        }
        this.numItems++;
        const idx: number = this.hashCode(key);
        const loadFactor: number = this.numItems / this.table.length;

        if (this.MAX_LOAD_FACTOR < loadFactor) {
            this.resize();
        }

        if (this.table[idx]) {
            this.table[idx].push([key, value]);
        } else {
            this.table[idx] = [[key, value]];
        }
    }

    public get(key: T): E | null {
        if (undefined === key || null === key || "" === key) {
            throw Error("Cannot have NULL or Undefined Key")
        }
        const val = 1;
        const idx: number = this.hashCode(key);
        if (undefined === this.table[idx] || null === this.table[idx]) {
            return null;
        }
        return this.table[idx].find((x: T[]) => x[0] === key)[val];
    }

    public hasKey(key: T): boolean {
        if (undefined === key || null === key || "" === key) {
            return false;
        }
        const idx: number = this.hashCode(key);
        if (this.table[idx]) {
            return this.table[idx].some((x: [T, E]) => x[0] === key);
        }
        return false;
    }

    public getOrDefault(key: T, value: E): E {
        if (undefined === key || null === key || "" === key) {
            throw Error("Cannot have NULL or Undefined Key")
        }
        const val: number = 1;
        const idx: number = this.hashCode(key);

        if (undefined === this.table[idx] || null === this.table[idx]) {
            return value;
        }
        return this.table[idx].find((x: T[]) => x[0] === key)[val];
    }

    public remove(key: T): void {
        if (undefined === key || null === key || "" === key) {
            throw Error("Cannot have NULL or Undefined Key")
        }
        const idx: number = this.hashCode(key);
        this.table = this.table[idx].filter((x: any[]) => x[0] !== key);
        this.numItems--;
    }

    // https://gist.github.com/hyamamoto/fd435505d29ebfa3d9716fd2be8d42f0?permalink_comment_id=4557681#gistcomment-4557681
    private hashCode(key: T): number {
        const s: string = this.toString(key);
        return [...s].reduce(
            (hash, c) => (Math.imul(31, hash) + c.charCodeAt(0)) | 0,
            0
        );
    }

    private isNumber(x: any): x is number {
        return typeof x === "number";
    }

    private isBigInt(x: any): x is number {
        return typeof x === "bigint";
    }

    private isString(x: any): x is string {
        return typeof x === "string";
    }

    private isObject(x: any): x is string {
        return typeof x === "object";
    }

    private isFunction(x: any): x is string {
        return typeof x === "function";
    }

    private isSymbol(x: any): x is string {
        return typeof x === "symbol";
    }

    private toString(key: any): string {
        if (this.isObject(key)) {
            return JSON.stringify(key);
        } else if (this.isBigInt(key) || this.isNumber(key)) {
            return `${key}`;
        } else if (this.isFunction(key) || this.isSymbol(key)) {
            return key.toString();
        }
        return key;
    }

    public static of(...args: any[]): HashSet<any, any> {
        const hashset: HashSet<any, any> = new HashSet(args.length);

        for (let i: number = 0; i < args.length; i++) {
            hashset.put(args[i][0], args[i][1]);
        }
        return hashset;
    }

}

export default HashSet;
