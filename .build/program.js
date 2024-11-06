"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Program = /** @class */ (function () {
    function Program(args) {
        this.args = args;
    }
    Program.prototype.Run = function () {
        console.log("Hello World");
    };
    Program.prototype.Configure = function (config) {
        console.log("Configuring...");
        return this;
    };
    Program.prototype.Build = function (modelConfig) {
        console.log("Building...");
        return this;
    };
    return Program;
}());
var instance = new Program(process.argv.slice(2))
    .Build("model.json")
    .Configure("config.json")
    .Run();
//# sourceMappingURL=program.js.map