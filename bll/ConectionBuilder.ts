import path from "path";
import fs from "fs";
import { IConnectionProvider } from "../common/IConectionProvider";


export class ConectionBuilder implements IConnectionProvider {
  private config: any;
  private readConfig(filePath: string) {
    try {
      // Чтение файла
      const fullPath = path.resolve("./", filePath);
      const data = fs.readFileSync(fullPath, "utf-8");

      // Парсинг JSON
      this.config = JSON.parse(data);
    } catch (error) {
      console.error("Ошибка при чтении файла конфигурации:", error);
    }
  }
  constructor(filepath: string) {
    this.readConfig(filepath);
  }
  build(entityName: string): string | undefined {
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
 }
