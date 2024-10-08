import fs, { readFileSync, writeFileSync } from 'fs';

class ContactRepository implements IContactRepository {
    private contacts: Contact[] = [];
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
        this.loadContactsFromFile();
    }

    getAll(): Contact[] {
        return this.contacts;
    }

    getById(id: number): Contact | undefined {
        return this.contacts.find(contact => contact.id === id);
    }

    add(contact: Contact): void {
        this.contacts.push(contact);
        this.saveContactsToFile();
    }

    update(contact: Contact): void {
        const index = this.contacts.findIndex(c => c.id === contact.id);
        if (index !== -1) {
            this.contacts[index] = contact;
            this.saveContactsToFile();
        }
    }

    delete(id: number): void {
        this.contacts = this.contacts.filter(contact => contact.id !== id);
        this.saveContactsToFile();
    }

    private saveContactsToFile(): void {
        fs.writeFileSync(this.filePath, JSON.stringify(this.contacts, null, 2), 'utf-8');
    }

    private loadContactsFromFile(): void {
        if (fs.existsSync(this.filePath)) {
            const data = fs.readFileSync(this.filePath, 'utf-8');
            this.contacts = JSON.parse(data);
        }
    }

    getFilePath(): string {
        return this.filePath;
    }

    // Поиск по номеру телефона
    findByPhoneNumber(phoneNumber: string): Contact | undefined {
        return this.contacts.find(contact =>
            contact.phones.some(phone => phone.number === phoneNumber)
        );
    }

    // Поиск по полному имени
    findByFullName(name: string): Contact | undefined {
        return this.contacts.find(contact => contact.name === name);
    }

    // Поиск по возрасту и городу
    findByAgeAndCity(age: number, city: string): Contact[] {
        return this.contacts.filter(contact => contact.age === age && contact.city === city);
    }

    // Поиск по email
    findByEmail(email: string): Contact | undefined {
        return this.contacts.find(contact =>
            contact.emails.some(mail => mail.address === email)
        );
    }
}
const filePath = './contacts.json';
const repository = new ContactRepository(filePath);

// Добавление нового контакта
repository.add({
    id: 1,
    name: "John Doe",
    age: 30,
    city: "New York",
    phones: [
        { type: "mobile", number: "+1234567890" },
        { type: "home", number: "+0987654321" }
    ],
    emails: [
        { type: "work", address: "john@example.com" },
        { type: "personal", address: "doe@example.com" }
    ]
});

// Поиск по номеру телефона
console.log("Поиск по номеру телефона:", repository.findByPhoneNumber("+1234567890"));

// Поиск по полному имени
console.log("Поиск по полному имени:", repository.findByFullName("John Doe"));

// Поиск по возрасту и городу
console.log("Поиск по возрасту и городу:", repository.findByAgeAndCity(30, "New York"));

// Поиск по email
console.log("Поиск по email:", repository.findByEmail("john@example.com"));