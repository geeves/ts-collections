class Utils {

  // https://gist.github.com/hyamamoto/fd435505d29ebfa3d9716fd2be8d42f0?permalink_comment_id=4557681#gistcomment-4557681
  public static hashCode(key: any): number {
    const s: string = Utils.toString(key);
    return [...s].reduce(
      (hash, c) => (Math.imul(31, hash) + c.charCodeAt(0)) | 0,
      0
    );
  }

  private static isNumber(x: any): x is number {
    return typeof x === "number";
  }

  private static isBigInt(x: any): x is number {
    return typeof x === "bigint";
  }

  private static isString(x: any): x is string {
    return typeof x === "string";
  }

  private static isObject(x: any): x is string {
    return typeof x === "object";
  }

  private static isFunction(x: any): x is string {
    return typeof x === "function";
  }

  private static isSymbol(x: any): x is string {
    return typeof x === "symbol";
  }

  public static toString(key: any): string {
    if (Utils.isObject(key)) {
      return JSON.stringify(key);
    } else if (Utils.isBigInt(key) || Utils.isNumber(key)) {
      return `${key}`;
    } else if (Utils.isFunction(key) || Utils.isSymbol(key)) {
      return key.toString();
    }
    return key;
  }
}

export default Utils;
