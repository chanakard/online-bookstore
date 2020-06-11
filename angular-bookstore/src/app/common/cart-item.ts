import { Book } from './book';
export class CartItem {
    id:string;
    name:string;
    imgUrl:string;
    unitPrice:number;
    quantity:number; 

    constructor(book:Book)
    {
        this.id=book.id;
        this.name=book.name;
        this.imgUrl=book.imageUrl;
        this.unitPrice=book.unitPrice;
        this.quantity=1;
    }
}
