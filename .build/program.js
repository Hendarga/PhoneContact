"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ContactBook_1 = require("./bll/ContactBook");
var FileRepository_1 = require("./common/FileRepository");
var Program = /** @class */ (function () {
    function Program(args) {
        this.args = args;
    }
    Program.prototype.Run = function () {
        var contactBook = new ContactBook_1.ContactBook();
        var contact = ({
            id: 2,
            name: "John Doe",
            age: 30,
            city: "New York",
            phones: [{
                    number: "1234567890",
                    type: "Mobile"
                }],
            emails: [{
                    address: "john.doe@example.com",
                    type: "Home"
                }]
        });
        contactBook.addContact(contact);
        console.log(book.findByPhoneNumber("1234567890"));
        // Получение всех контактов
        var allContacts = contactBook.getContacts();
        console.log(allContacts);
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