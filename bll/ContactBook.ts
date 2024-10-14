class ContactBook implements IContactBook {
    private contacts: IContact[] = [];

    addContact(contact: IContact): void {
        this.contacts.push(contact);
    }

    getContacts(): IContact[] {
        return this.contacts;
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