import {IRepository} from "./IRepository";

export default class Repository<T> implements IRepository<T> {
    protected items: T[];

    constructor(initCapacity: number = 3) {
        this.items = new Array(initCapacity);
    }

    create(pattern: T): void {
        this.items.push(pattern);
    }

    read(): T[] {
        return this.items;
    }

    update(index: number, updatedPattern: T): void {
        this.items[index] = updatedPattern;
    }

    delete(index: number): void {
        this.items.splice(index, 1);
    }
}