/**
 * 是否是函数（基于isType的实现）
 * @param v
 * @returns
 */
export const isFunction = (v: any): v is Function =>
  isType('Function')(v) || isType('AsyncFunction')(v)

/**
 * 是否是某种类型
 * @param t
 * @returns
 */
export const isType =
  (
    t:
      | 'Array'
      | 'Object'
      | 'Function'
      | 'AsyncFunction'
      | 'String'
      | 'Number'
      | 'Null'
      | 'Undefined'
      | 'Map'
      | 'Set'
      | 'RegExp',
  ) =>
  (v: any) =>
    Object.prototype.toString.call(v) === `[object ${t}]`

/**
 * 是否是Promise（鸭子类型判断）
 * @param val
 * @returns
 */
export const isPromise = <T = any>(val: any): val is Promise<T> => {
  return isDef(val) && isFunction(val.then) && isFunction(val.catch)
}

/**
 * 判断是否定义(null、undefined会被识别为未定义)
 * @param val
 * @returns
 */
export function isDef<T>(val: T): val is NonNullable<T> {
  return val !== undefined && val !== null
}