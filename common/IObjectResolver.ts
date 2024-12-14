export interface IObjectResolver{
/**
 * Resolves an object of the specified type.
 * 
 * @template objtype The type of object to resolve.
 * @returns An object of type `objtype`.
 */
resolveObject<TClass extends any>(constructor: new (...args: any[]) => TClass): any | undefined
}