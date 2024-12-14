"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ContactBook_1 = require("./bll/ContactBook");
var ObjectResolver_1 = require("./common/ObjectResolver");
var addMockData = false;
var Program = /** @class */ (function () {
    function Program(args) {
        this.args = args;
    }
    Program.prototype.Run = function () {
        var contactBook = ObjectResolver_1.ObjectResolver.instance.resolveObject(ContactBook_1.ContactBook);
        if (addMockData) {
            initializeMock(contactBook);
        }
        // IContactBook Testing
        console.log(contactBook.findByPhoneNumber("2555555555"));
        var temp = contactBook.findByFullName("александров");
        console.log(JSON.stringify(temp));
        console.log(JSON.stringify(contactBook.findByAgeAndCity(35, "Казань")));
        console.log(JSON.stringify(contactBook.findByEmail("alexey@example.com")));
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
function initializeMock(contactBook) {
    // Добавляем тестовые контакты
    contactBook.addContact({
        id: 200,
        name: "Алексей Александров",
        phones: [
            {
                number: "2555555555",
                type: "Mobile",
            },
        ],
        emails: [
            {
                address: "alexey@example.com",
                type: "Work",
            },
        ],
        age: 35,
        city: "Казань",
    });
    contactBook.addContact({
        id: 300,
        name: "Дмитрий Дмитриев",
        phones: [
            {
                number: "6666666666",
                type: "Home",
            },
        ],
        emails: [
            {
                address: "dmitriy@example.com",
                type: "Personal",
            },
        ],
        age: 40,
        city: "Новосибирск",
    });
    // Проверяем поиск по полному имени
    var foundContact1 = contactBook.findByFullName("иван иванов");
    console.log("Найденный контакт (иван иванов):", foundContact1); // Ожидается, что это будет объект с именем 'Иван Иванов'
    var foundContact2 = contactBook.findByFullName("Алексей Александров");
    console.log("Найденный контакт (Алексей Александров):", foundContact2); // Ожидается, что это будет undefined
    /* const student: Student = {
       id: 1,
       fullName: "Marat",
       age: 14,
       courses: ["Art"],
       gpa: 83,
       contactInfo: {
         email: "marat.mkfer@gmail.com",
         phone: "05314395991",
       },
       address: {
         country: "Turkey",
         city: "Alanya",
         postalCode: "071400",
       },
     };
     const students: FileRepository<Student, number> = new FileRepository<
       Student,
       number
     >("./model/data/Student.json");
     students.create(student);
     students.Save();
  */
}
//# sourceMappingURL=program.js.map