import path from "path";
import fs from "fs";

import { IObjectResolver } from "./IObjectResolver";
import { IConnectionProvider } from "./IConectionProvider";

import { ContactBook } from "../bll/ContactBook";
import { Contact } from "../model/Contact";
import { CloudFlareRepository } from "../CF/CloudFlareRepository";
import { FileRepository } from "./FileRepository";
import { IDataSource } from "./IDataSource";

export class ObjectResolver implements IObjectResolver, IConnectionProvider{
    
  public static instance: ObjectResolver = new ObjectResolver(".\\config.json");

  private config: any;

  constructor(configPath : string) {
    this.readConfig(configPath);
  }
    
  resolveObject<TClass extends any>(constructor: string | null| (new (...args: any[]) => TClass)): any | undefined {

    if(constructor == null)
    {
      return this;
    }

    let tName:string;
    if (typeof constructor === "string") {
      tName = constructor;
    } else
    {
      tName = constructor.name;
    }
    switch (tName.trim()) {
        case"IConectionProvider": return this;
        case "ContactBook":
        case "IContactBook":
           return new ContactBook();

        // Define concrete implementation for FileRepository storage
        case "FileRepository<Contact,number>":
          return new FileRepository<Contact, number>(this.buildConnection("contact"));

        // Define concrete implementation for CloudFlareRepository storage
        case "CloudFlareRepository<Contact,number>":
          return new CloudFlareRepository<Contact, number>(this.buildConnection("contact"));
  
        case "IDataSource<Contact,number>":
          {
            if(this.config.mode == "local"){
              return this.resolveObject<IDataSource<Contact, number>>("FileRepository<Contact,number>"); 
            }
            if(this.config.mode == "cloud"){
              return this.resolveObject<IDataSource<Contact, number>>("CloudFlareRepository<Contact,number>");
            }
          }
      default:
        return undefined;
    }

  }

  buildConnection(entityName: string): string | undefined {
    if(this.config==undefined){
      throw new Error("Config is undefined");
    }
    if(this.config.mode== "cloud"){
      return this.config.conectionstring;
    }
    if(this.config.mode == "local"){
      switch (entityName) {
        case "contact":
          return path.resolve(this.config.localDataDir,"Contacts.json");
        default:
          return undefined;
        }
    
    }
  }

  private readConfig(filePath: string) {
    try {
      // reading a string from a file
      const fullPath = path.resolve("./", filePath);
      const data = fs.readFileSync(fullPath, "utf-8");

      // parse JSON
      this.config = JSON.parse(data);
    } catch (error) {
      console.error("Error while reading config file:", error);
    }
}
}
//ge