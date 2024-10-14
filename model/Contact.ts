import { IIdentified } from "../common/IIdentified";
import { Phone } from "../model/Phone";
import { Email } from "../model/email";
/**
 * Represents a contact with personal information and communication details.
 * 
 * @interface Contact
 * 
 * @property {number} id - The unique identifier for the contact.
 * @property {string} name - The name of the contact.
 * @property {number} age - The age of the contact.
 * @property {string} city - The city where the contact resides.
 * @property {Phone[]} phones - A list of phone numbers associated with the contact.
 * @property {Email[]} emails - A list of email addresses associated with the contact.
 */
export interface Contact extends IIdentified<number> {
    id: number;
    name: string;
    age: number;
    city: string;
    phones: Phone[];
    emails: Email[];
}