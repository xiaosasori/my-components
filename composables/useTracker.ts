import { cloneDeep, isEqual, pick } from 'lodash-es'

class ChangeTracker {
  _store: WeakMap<object, any>
  constructor() {
    this._store = new WeakMap()
  }

  track(object: any) {
    // Clone the object
    const clone = cloneDeep(object)
    // Store it
    this._store.set(object, clone)
  }

  getOriginal(object: any) {
    // Access everything so if this function is used inside a
    // computed property, Vue will refresh the computed value
    // when object changes
    for (const prop in object) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const __ = object[prop]
    }
    return this._store.get(object)
  }

  changedProps(object: any) {
    const clone = this.getOriginal(object)
    if (clone === undefined) {
      throw new Error(
        'This object was not tracked. Call objectTracker.track(object) first.'
      )
    }
    const props = []
    for (const prop in object) {
      if (!isEqual(object[prop], clone[prop])) {
        props.push(prop)
      }
    }
    return props
  }

  changed(object: any) {
    return pick(object, this.changedProps(object))
  }

  /**
   * Mark a property as unchanged by copying value back to original object
   * @param {object} object
   * @param {string} prop
   */
  setUnchanged(object: any, prop: any) {
    const original = this.getOriginal(object)
    original[prop] = object[prop]
  }
}

export const changeTracker = new ChangeTracker()
