import { IContactBook } from "../model/IContactBook"; // Импорт интерфейса IContactBook
import { Contact } from "../model/Contact"; // Импорт модели Contact
import Repository from "../common/Repository"; // Импорт общего класса Repository
import { FileRepository } from "../common/FileRepository";
import { IConnectionProvider } from "../common/IConectionProvider";
import { IDataSource } from "../common/IDataSource";
import { IObjectResolver } from "../common/IObjectResolver";
import { ObjectResolver, resolveInstance } from "../common/ObjectResolver";

export class ContactBook /* extends Repository<Contact, number>*/ implements IContactBook
{
  contacts: IDataSource<Contact, number>;
  provider:IObjectResolver=new ObjectResolver();
  constructor() {
    this.contacts = resolveInstance(IDataSource<Contact,number>)
   /* const cstring: string | undefined = provider.build("contact");
    if (cstring == undefined) {
      throw new RangeError("contact");
    }
    this.contacts = new FileRepository<Contact, number>(cstring); */
  }
  updateContact(contact: Contact): void {
    this.contacts.update(contact);
    this.contacts.Save();
  }
  addContact(contact: Contact): void {
    this.contacts.create(contact);
    this.contacts.Save();
  }

  getContacts(): Contact[] {
    return this.contacts.getAll();
  }

  // Поиск по номеру телефона
  findByPhoneNumber(phoneNumber: string): Contact | undefined {
    return this.contacts.find((contact) =>
      contact.phones.some((phone) => phone.number === phoneNumber)
    );
  }
  searchSubstring = (word: string, substring: string): boolean => {
    return word.includes(substring);
  };
  // Поиск по полному имени
  findByFullName(name: string): Contact | undefined {
    return this.contacts.find((contact) =>
      contact.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  // Поиск по возрасту и городу
  findByAgeAndCity(age: number, city: string): Contact[] {
    return this.contacts.filter(
      (contact) => contact.age === age && contact.city === city
    );
  }

  // Поиск по email
  findByEmail(email: string): Contact | undefined {
    return this.contacts.find((contact) =>
      contact.emails.some((mail) => mail.address === email)
    );
  }
}
