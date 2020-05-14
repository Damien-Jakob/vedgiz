import {Supplier} from "./supplier";

export class Vegetable {
    public id: string; // easier to keep it as a string tu use in url
    public name: string;
    public details: string;
    public unit: string;
    public stock: number;
    public picture: string;
    public price: number;
    public current: boolean;
    public suppliers: Array<Supplier>;
    // TODO find better type
    public created_at: string;
    public updated_at: string;
}