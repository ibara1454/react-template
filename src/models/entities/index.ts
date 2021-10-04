/**
 * Make a copy of the given object and overwrite it by the specific properties..
 * @param src - The original object.
 * @param param - The properties which are used to overwrite.
 * @returns The copy of the original object.
 */
// eslint-disable-next-line import/prefer-default-export
export function copy<T extends object>(src: T, param?: Partial<T>): T {
  return { ...src, ...param };
}
