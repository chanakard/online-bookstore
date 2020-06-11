import { CartItem } from './../common/cart-item';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItm: CartItem) {
    //check whether item is already in the cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {
      //find the book in the cart based on id
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id == theCartItm.id);

      alreadyExistsInCart = (existingCartItem != undefined)
    }

    if (alreadyExistsInCart) {
      //increment the quantity
      existingCartItem.quantity++;
    }
    else {
      //add to cart item array
      this.cartItems.push(theCartItm);
    }

    this.calculateTotalPrice();
  }
  calculateTotalPrice() {
    //caculate the totalPrice
    let totalPriceValue:number = 0;
    let totalQuantityValue:number = 0;

    //calculate the totalPrice and totalQUntity
    for(let currenctCartItem of this.cartItems)
    {
      totalPriceValue += currenctCartItem.quantity * currenctCartItem.unitPrice;
      totalQuantityValue += currenctCartItem.quantity;
    }

    console.log('total totalPriceValue '+totalPriceValue);
    console.log('total totalQuantityValue '+totalQuantityValue);

    //publish the events
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }


  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;
    if(cartItem.quantity === 0)
    {
      this.remove(cartItem);
    }
    this.calculateTotalPrice();
  }

  remove(cartItem: CartItem)
  {
    const itemIndex = this.cartItems.findIndex(
      (temCartItem) => {return temCartItem.id === cartItem.id}
    )

    if(itemIndex > -1)
    {
      this.cartItems.splice(itemIndex,1);
      this.calculateTotalPrice();
    }
  }
}
