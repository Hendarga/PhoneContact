/**
 * Interface to determine if two objects are equal.
 * @template T - The type of objects that can be compared.
 */
export interface IEquatable<T> {
    /**
     * Determines if two objects are equal.
     * @param {T} item - The item to compare.
     * @param {any} pattern - The pattern to compare against.
     * @returns {boolean} - True if the item is equal to the pattern; otherwise, false.
     */
    equals(item: T, pattern: any|undefined): boolean;
}