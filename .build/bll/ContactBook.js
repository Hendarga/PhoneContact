"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactBook = void 0;
var Repository_1 = __importDefault(require("../common/Repository"));
var ContactBook = /** @class */ (function (_super) {
    __extends(ContactBook, _super);
    function ContactBook() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContactBook.prototype.addContact = function (contact) {
        this.create(contact);
    };
    ContactBook.prototype.getContacts = function () {
        return this.getAll();
    };
    // Поиск по номеру телефона
    ContactBook.prototype.findByPhoneNumber = function (phoneNumber) {
        return this.items.find(function (contact) {
            return contact.phones.some(function (phone) { return phone.number === phoneNumber; });
        });
    };
    // Поиск по полному имени
    ContactBook.prototype.findByFullName = function (name) {
        return this.items.find(function (contact) { return contact.name === name; });
    };
    // Поиск по возрасту и городу
    ContactBook.prototype.findByAgeAndCity = function (age, city) {
        return this.items.filter(function (contact) { return contact.age === age && contact.city === city; });
    };
    // Поиск по email
    ContactBook.prototype.findByEmail = function (email) {
        return this.items.find(function (contact) {
            return contact.emails.some(function (mail) { return mail.address === email; });
        });
    };
    return ContactBook;
}(Repository_1.default));
exports.ContactBook = ContactBook;
//# sourceMappingURL=ContactBook.js.map