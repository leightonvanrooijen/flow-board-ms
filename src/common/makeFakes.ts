export const makeFakes =
  <T extends Record<string, any>>(fakeFn: (overwrite?: Partial<T>) => T) =>
  (number: number, overwrites?: Partial<T>[]) => {
    const numToLoop = new Array(number).fill(0)
    return numToLoop.map((_, index) => {
      if (overwrites?.[index]) {
        return fakeFn(overwrites[index])
      }
      return fakeFn()
    })
  }
