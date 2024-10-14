import { IRepository } from "../common/IRepository";
import { Contact } from "./Contact";

/**
 * Interface representing a contact book repository.
 * Extends the generic IRepository interface with Contact type.
 * Provides methods for searching contacts based on various criteria.
 */
export interface IContactBook extends IRepository<Contact, number> {

    /**
     * Adds a new contact to the contact book.
     * @param contact - The contact to add.
     */
    addContact(contact: Contact): void;

    /**
     * Retrieves all contacts from the contact book.
     * @returns An array of all contacts in the contact book.
     */
    getContacts(): Contact[] ;

    /**
     * Finds a contact by their phone number.
     * @param phoneNumber - The phone number to search for.
     * @returns The contact with the specified phone number, or undefined if not found.
     */
    findByPhoneNumber(phoneNumber: string): Contact | undefined;

    /**
     * Finds a contact by their full name.
     * @param name - The full name to search for.
     * @returns The contact with the specified full name, or undefined if not found.
     */
    findByFullName(name: string): Contact | undefined;

    /**
     * Finds contacts by their age and city.
     * @param age - The age to search for.
     * @param city - The city to search for.
     * @returns An array of contacts matching the specified age and city.
     */
    findByAgeAndCity(age: number, city: string): Contact[];

    /**
     * Finds a contact by their email address.
     * @param email - The email address to search for.
     * @returns The contact with the specified email address, or undefined if not found.
     */
    findByEmail(email: string): Contact | undefined;
}