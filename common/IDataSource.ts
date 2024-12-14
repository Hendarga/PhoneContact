import { IIdentified } from "./IIdentified";
import { IRepository } from "./IRepository";

export interface IDataSource<T extends IIdentified<K>, K>  extends IRepository<T, K>{
    Save():void;
    Load():void;

}