"use strict";
class Program {
    args;
    constructor(args) {
        this.args = args;
    }
    Run() {
        let message = "Hello World!";
        console.log(message);
    }
    Configure(config) {
        console.log("Configuring...");
        return this;
    }
    Build(modelConfig) {
        console.log("Building...");
        return this;
    }
}
const instance = new Program(process.argv.slice(2))
    .Build("model.json")
    .Configure("config.json")
    .Run();
