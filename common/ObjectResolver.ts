import path from "path";
import fs from "fs";

import { IObjectResolver } from "./IObjectResolver";
import { IConnectionProvider } from "./IConectionProvider";

import { ContactBook } from "../bll/ContactBook";
import { Contact } from "../model/Contact";
import { CloudFlareRepository } from "../CF/CloudFlareRepository";
import { FileRepository } from "./FileRepository";

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
    switch (tName) {
        case"IConectionProvider": return this;
        case "ContactBook":
        case "IContactBook":
           return new ContactBook();
        case "IDataSource<Contact,number>":
          {
            if(this.config.mode == "local"){
              return new FileRepository<Contact, number>(this.buildConnection("contact"));
            }
            if(this.config.mode == "cloud"){
              return new CloudFlareRepository<Contact, number>(this.buildConnection("contact"));
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
    switch (entityName) {
    case "contact":
      return path.resolve(this.config.conectionstring,"Contacts.json");
    default:
      return undefined;
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