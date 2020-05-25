import {Supplier} from "./supplier";

export class Vegetable {
    public id: number;
    public name: string;
    public details: string;
    public unit: string;
    public stock: number;
    public picture: string;
    public price: number;
    public current: boolean;
    public suppliers: Array<Supplier>;
    public created_at: string;
    public updated_at: string;
}