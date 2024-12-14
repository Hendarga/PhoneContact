"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactBook = void 0;
var ObjectResolver_1 = require("../common/ObjectResolver");
var ContactBook /* extends Repository<Contact, number>*/ = /** @class */ (function () {
    function ContactBook() {
        var _a;
        this.searchSubstring = function (word, substring) {
            return word.includes(substring);
        };
        // ensure default provider is set
        ContactBook.provider = (_a = ContactBook.provider) !== null && _a !== void 0 ? _a : ObjectResolver_1.ObjectResolver.instance;
        this.contacts = ContactBook.provider.resolveObject("");
    }
    ContactBook.prototype.updateContact = function (contact) {
        this.contacts.update(contact);
        this.contacts.Save();
    };
    ContactBook.prototype.addContact = function (contact) {
        this.contacts.create(contact);
        this.contacts.Save();
    };
    ContactBook.prototype.getContacts = function () {
        return this.contacts.getAll();
    };
    // Поиск по номеру телефона
    ContactBook.prototype.findByPhoneNumber = function (phoneNumber) {
        return this.contacts.find(function (contact) {
            return contact.phones.some(function (phone) { return phone.number === phoneNumber; });
        });
    };
    // Поиск по полному имени
    ContactBook.prototype.findByFullName = function (name) {
        return this.contacts.find(function (contact) {
            return contact.name.toLowerCase().includes(name.toLowerCase());
        });
    };
    // Поиск по возрасту и городу
    ContactBook.prototype.findByAgeAndCity = function (age, city) {
        return this.contacts.filter(function (contact) { return contact.age === age && contact.city === city; });
    };
    // Поиск по email
    ContactBook.prototype.findByEmail = function (email) {
        return this.contacts.find(function (contact) {
            return contact.emails.some(function (mail) { return mail.address === email; });
        });
    };
    return ContactBook;
}());
exports.ContactBook = ContactBook;
//# sourceMappingURL=ContactBook.js.map