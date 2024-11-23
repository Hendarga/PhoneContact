import {  } from "./model/.exports";
import * as common from "./common/.exports";
import { ContactBook } from "./bll/ContactBook";
import { Contact } from "./model/Contact";
import { FileRepository } from "./common/FileRepository";
import { IIdentified } from "./common/IIdentified";
import { Student} from "./model/Student"
import { stdin } from "process";
interface Person extends IIdentified<number> {
    name: string;
    age: number;
  }
  
class Program {

    constructor(public args: string[]) {

    }

    public Run(): void {
        const contactBook = new ContactBook();



        const student:Student={
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
        const students:FileRepository<Student,number>=new FileRepository<Student,number>("./model/data/Student.json");
        students.create(student);
        students.Save()
           
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