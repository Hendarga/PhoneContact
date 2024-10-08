import {  } from "./model/.exports";
import * as common from "./common/.exports";


class Program {

    constructor(public args: string[]) {

    }

    public Run(): void {
        let message: string = "Hello World!";
        console.log(message);

    }

    public Configure(config:string): Program {
        console.log("Configuring...");

        return this;
    }

    public Build(modelConfig:string): Program {
        console.log("Building...");

        return this;
    }
}

const instance = new Program(process.argv.slice(2))
    .Build("model.json")
    .Configure("config.json")
    .Run();