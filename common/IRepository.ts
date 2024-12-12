import { IFindable } from "./IFindable";
import { IIdentified } from "./IIdentified";
/**
 * Generic repository interface for managing a collection of items.
 * 
 * @template T - The type of items managed by the repository.
 */
export interface IRepository<T extends IIdentified<K>,K>extends IFindable<T>  {
    /**
     * Retrieves all items from the repository.
     * 
     * @returns An array of all items.
     */
    getAll(): T[];
  
    /**
     * Retrieves an item by its unique identifier.
     * 
     * @param id - The unique identifier of the item.
     * @returns The item if found, otherwise `undefined`.
     */
    getById(id: K): T | undefined;

    /**
     * Adds a new item to the repository.
     * 
     * @param item - The item to add.
     */
    create(item: T): number;

    /**
     * Updates an existing item in the repository.
     * 
     * @param item - The item with updated information.
     */
    update(item: T): number;

    /**
     * Deletes an item from the repository by its unique identifier.
     * 
     * @param id - The unique identifier of the item to delete.
     */
    delete(id: K): number;
}

