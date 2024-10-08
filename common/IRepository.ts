interface Phone {
    type: string;
    number: string;
}

interface Email {
    type: string;
    address: string;
}

interface Contact {
    id: number;
    name: string;
    age: number;
    city: string;
    phones: Phone[];
    emails: Email[];
}
interface IContactRepository {
    getAll(): Contact[];
    getById(id: number): Contact | undefined;
    add(contact: Contact): void;
    update(contact: Contact): void;
    delete(id: number): void;

    // Методы поиска
    findByPhoneNumber(phoneNumber: string): Contact | undefined;
    findByFullName(name: string): Contact | undefined;
    findByAgeAndCity(age: number, city: string): Contact[];
    findByEmail(email: string): Contact | undefined;
}