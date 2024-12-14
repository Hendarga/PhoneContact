import {} from "./model/.exports";
import * as common from "./common/.exports";
import { ContactBook } from "./bll/ContactBook";
import { Contact } from "./model/Contact";
import { FileRepository } from "./common/FileRepository";
import { IIdentified } from "./common/IIdentified";
import { Student } from "./model/Student";
import { stdin } from "process";
import { json } from "stream/consumers";
import { ConectionBuilder } from "./bll/ConectionBuilder";
interface Person extends IIdentified<number> {
  name: string;
  age: number;
}
 const addMockData=false; 
class Program {
  constructor(public args: string[]) {}

  public Run(): void {
    const builder:ConectionBuilder=new ConectionBuilder(".\\config.json");
    const contactBook = new ContactBook(builder);
    if(addMockData){
      initializeMock(contactBook);
    } 
// IContactBook Testing
console.log(contactBook.findByPhoneNumber("2555555555"));
let temp:Contact | undefined=contactBook.findByFullName("александров");
console.log(JSON.stringify(temp));
console.log(JSON.stringify(contactBook.findByAgeAndCity(35, "Казань")));
console.log(JSON.stringify(contactBook.findByEmail("alexey@example.com")));


}
  
  public Configure(config: string): Program {
    console.log("Configuring...");

    return this;
  }

  public Build(modelConfig: string): Program {
    console.log("Building...");

    return this;
  }
}

const instance = new Program(process.argv.slice(2))
  .Build("model.json")
  .Configure("config.json")
  .Run();
function initializeMock(contactBook:ContactBook) {
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
      const foundContact1 = contactBook.findByFullName("иван иванов");
      console.log("Найденный контакт (иван иванов):", foundContact1); // Ожидается, что это будет объект с именем 'Иван Иванов'
  
      const foundContact2 = contactBook.findByFullName("Алексей Александров");
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

