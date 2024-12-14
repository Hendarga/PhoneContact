import { IDataSource } from "../common/IDataSource";
import { IIdentified } from "../common/IIdentified";
import Repository from "../common/Repository";

export class CloudFlareRepository <T extends IIdentified<K>, K>  extends Repository<T, K>implements IDataSource<T,K>{
   Save(): void {
      throw new Error("Method not implemented.");
   }
   Load(): void {
      throw new Error("Method not implemented.");
   }
   // private readonly _api: CloudFlareAPI;



}