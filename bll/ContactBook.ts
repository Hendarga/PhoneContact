
import { IContactBook } from '../model/IContactBook';
import { Contact } from '../model/Contact';
import Repository from '../common/Repository';



export class ContactBook extends Repository<Contact, number> implements  IContactBook {
    
    addContact(contact: Contact): void {
        this.create(contact);
    }

    getContacts(): Contact[] {
        return this.getAll();
    }

 
    // Поиск по номеру телефона
    findByPhoneNumber(phoneNumber: string): Contact | undefined {
        return this.items.find(contact =>
            contact.phones.some(phone => phone.number === phoneNumber)
        );
    }

    // Поиск по полному имени
    findByFullName(name: string): Contact | undefined {
        return this.items.find(contact => contact.name === name);
    }

    // Поиск по возрасту и городу
    findByAgeAndCity(age: number, city: string): Contact[] {
        return this.items.filter(contact => contact.age === age && contact.city === city);
    }

    // Поиск по email
    findByEmail(email: string): Contact | undefined {
        return this.items.find(contact =>
            contact.emails.some(mail => mail.address === email)
        );
    }
}