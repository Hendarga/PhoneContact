import fs, { readFileSync, writeFileSync } from 'fs';
import { inherits } from 'util';
import Repository from './Repository';
import { IIdentified } from './IIdentified';
import { IElementUpdate } from './IElementUpdate';
import { ActionTypes } from './IElementUpdate'; // Assuming ActionTypes is defined in a separate module

export class FileRepository<T extends IIdentified<K>, K>  extends Repository<T, K> {
    private elementUpdater: onElementUpdate<T> | undefined;
    public readonly loadFromFile:any;
    public readonly flush:any;

    constructor(filePath: string) {
        super();
        // Check if file exists
        if(!fs.existsSync(filePath)) {
            throw new Error(`File ${filePath} does not exist`); 
        }

        // Load items from file and initialize the elements updater
        this.elementUpdater = new onElementUpdate(filePath);
        this.loadFromFile =  this.elementUpdater.loadFromFile.bind(this.elementUpdater);
        this.flush =  this.elementUpdater.flush.bind(this.elementUpdater);
        
        this.items.push(...this.loadFromFile());
        this.onElementUpdate = this.elementUpdater;
    }

    getFilePath(): string|undefined {
        if (this.elementUpdater) {
            return this.elementUpdater.filePath;
        }
    }
}

/// <reference path="IElementUpdate.ts" />
class onElementUpdate<T>  implements IElementUpdate<T> {
    public readonly filePath: string;
    /**
     *
     */
    constructor(filePath: string) {
        this.filePath = filePath;
    }

    onUpdate(element: T, action: ActionTypes): void {
    switch (action){
        case 'CREATE':
        case 'UPDATE':
        case 'DELETE':
            ///TODO: add flush call if needed sync with file every action
            break;
        default:
            break;
    }

    }

    flush(items: T[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(items, null, 2), 'utf-8');
    }

    loadFromFile(): T[] {
        if (fs.existsSync(this.filePath)) {
            const data = fs.readFileSync(this.filePath, 'utf-8');
            return JSON.parse(data);
        }
        return new Array(0);
    }
}