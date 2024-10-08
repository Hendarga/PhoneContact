import { IRepository } from './IRepository';
import fs, { readFileSync, writeFileSync } from 'fs';

export default class FileRepository<T> implements IRepository<T> {
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

    async saveToFile(fileName: string): Promise<void> {
        try {
            writeFileSync(fileName, JSON.stringify(this.items));
            console.log("Saving to file...");
        } catch (err) {
            console.error(err);
        }
    }

    async loadFromFile(fileName: string): Promise<void> {
        try {
            const data = readFileSync(fileName, 'utf-8');
            this.items = JSON.parse(data);
            console.log("Loading from file...");
        } catch (err) {
            console.error(err);
        }
    }   
}