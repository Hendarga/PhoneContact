import { IIdentified } from "../common/IIdentified";
export interface Student extends IIdentified<number> {
    
    fullName: string;
    age: number;
    courses: string[];
    gpa: number;
    contactInfo: {
        email: string;
        phone: string;
    };
    address: {
        country: string;
        city: string;
        postalCode: string;
    };
}
