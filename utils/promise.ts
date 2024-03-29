/**
 * Promised `setTimeout`
 *
 * @category Promise
 */
export function sleep(ms: number) {
  return new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve()
    }, ms)
  )
}

/**
 * Promise with `resolve` and `reject` methods of itself
 */
export interface ControlledPromise<T = void> extends Promise<T> {
  resolve(value: T | PromiseLike<T>): void
  reject(reason?: any): void
}

/**
 * Return a Promise with `resolve` and `reject` methods
 *
 * @category Promise
 * @example
 * ```
 * const promise = createControlledPromise()
 *
 * await promise
 *
 * // in anther context:
 * promise.resolve(data)
 * ```
 */
export function createControlledPromise<T>(): ControlledPromise<T> {
  let resolve: any, reject: any
  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  }) as ControlledPromise<T>
  promise.resolve = resolve
  promise.reject = reject
  return promise
}

type ArrayElement<ArrayType> = ArrayType extends (infer ElementType)[]
  ? ElementType
  : never
type ResolveType<T> = T extends Promise<infer R> ? R : T

export async function avoidTooFastPromise<T>(
  promise: T extends ArrayElement<T>[]
    ? (Promise<ArrayElement<T>> | ArrayElement<T>)[]
    : T | Promise<T>,
  minimumWaitTime: number
): Promise<
  T extends ArrayElement<T>[] ? ResolveType<ArrayElement<T>>[] : ResolveType<T>
> {
  const multiplePromisesProvided = Array.isArray(promise)

  const arrayOfPromises = multiplePromisesProvided ? promise : [promise]

  const resolved = (
    await Promise.all([
      new Promise((resolve) => setTimeout(resolve, minimumWaitTime)),
      ...arrayOfPromises,
    ])
  ).slice(1)

  return multiplePromisesProvided ? resolved : resolved[0]
}

// https://twitter.com/wesbos/status/1600186156238442496
// https://github.com/open-draft/until
export type AsyncTuple<DataType = unknown, ErrorType = Error> =
  | [data: undefined, error: ErrorType]
  | [data: DataType, error: undefined]

export async function asyncWrap<DataType = unknown, ErrorType = Error>(
  func: () => Promise<DataType>
): Promise<AsyncTuple<DataType, ErrorType>> {
  try {
    const data = await func()
    return [data, undefined]
  } catch (err: any) {
    return [undefined, err]
  }
}
