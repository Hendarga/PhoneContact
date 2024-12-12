import { emitKeypressEvents } from "readline";
import { IIdentified } from "./IIdentified";
import { IRepository } from "./IRepository";
import { IElementUpdate } from "./IElementUpdate"; // Add this line to import IElemetUpdate
import { IEquatable } from "./IEquatable";

/**
 * A generic repository class that implements the IRepository interface.
 * This class provides basic CRUD operations for items of type T, where T extends IIdentified<K>.
 *
 * @template T - The type of items managed by the repository. Must extend IIdentified<K>.
 * @template K - The type of the identifier for items managed by the repository.
 *
 * @implements {IRepository<T, K>}
 */
export default class Repository<T extends IIdentified<K>, K>
  implements IRepository<T, K>
{
  protected items: T[];

  protected onElementUpdate: IElementUpdate<T> | undefined;

  constructor(initCapacity: number = 0) {
    this.items = new Array(initCapacity);
  }
  filter(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): T[] {
    return this.items.filter(predicate, thisArg);
  }
  find(
    predicate: (value: T, index: number, obj: T[]) => unknown,
    thisArg?: any
  ): T | undefined {
    return this.items.find(predicate);
  }

  getAll(): T[] {
    return this.items;
  }

  getById(id: K): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  create(element: T): number {
    let index = this.items.findIndex(
      (item) => item != undefined && item.id === element.id
    );
    if (index < 0) index = this.items.push(element) -1;
    else throw new Error(`Element with id ${element.id} already exists`);

    if (this.onElementUpdate) this.onElementUpdate.onUpdate(element, "CREATE");

    return index;
  }
  update(element: T): number {
    const index = this.items.findIndex((item) => item.id === element.id);
    if (index > -1) this.items[index] = element;
    if (this.onElementUpdate) this.onElementUpdate.onUpdate(element, "UPDATE");

    return index;
  }

  delete(id: K): number {
    const index = this.items.findIndex((item) => item.id === id);
    if (index > -1) this.items.splice(index, 1);

    if (this.onElementUpdate)
      this.onElementUpdate.onUpdate(this.items[index], "DELETE");

    return index;
  }
}
