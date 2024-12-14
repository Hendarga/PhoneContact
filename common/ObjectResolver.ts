import { IObjectResolver } from "./IObjectResolver";
import { IConnectionProvider } from "./IConectionProvider";
import { ConectionBuilder } from "../bll/ConectionBuilder";
import { ContactBook } from "../bll/ContactBook";
export function resolveInstance<TClass>(constructor: new (...args: any[]) => TClass): string {
    return constructor.name;
}
export class ObjectResolver implements IObjectResolver {
  resolveObject<TClass extends any>(constructor: new (...args: any[]) => TClass): any | undefined {
    switch (constructor.name) {
        case"IConectionProvider":return new ConectionBuilder(".\\config.json");
        //case"IContactBook":return new ContactBook(this.resolveObject<IConnectionProvider>(null));
      default:
        return undefined;
    }
  }
}
//ge