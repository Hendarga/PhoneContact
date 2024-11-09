"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FileRepository_1 = require("./common/FileRepository");
var Program = /** @class */ (function () {
    function Program(args) {
        this.args = args;
    }
    Program.prototype.Run = function () {
        var student = {
            id: 1,
            fullName: "Marat",
            age: 14,
            courses: ["Art"],
            gpa: 83,
            contactInfo: {
                email: "marat.mkfer@gmail.com",
                phone: "05314395991"
            },
            address: {
                country: "Turkey",
                city: "Alanya",
                postalCode: "071400"
            }
        };
        var students = new FileRepository_1.FileRepository("./model/data/Student.json");
        students.create(student);
        students.Save();
        /*    const AllPeoples: Person[] = [
                { name: 'Alice', age: 25, id:1 },
                { name: 'Bob', age: 30 ,id:2 },
                { name: 'Charlie', age: 35 ,id:3 }
              ];
              const peopels:FileRepository<Person,number>=new FileRepository<Person,number>("People.Json");
              peopels.create(AllPeoples[0]);
              peopels.Save();
    */
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