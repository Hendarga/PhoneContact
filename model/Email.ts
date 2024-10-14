
/**
 * Represents an email contact with a specific type and address.
 * 
 * @interface Email
 * @property {string} type - The type of email (e.g., personal, work).
 * @property {string} address - The email address.
 */
export interface Email {
    type: string;
    address: string;
}