import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;


  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
    this.cartDetails();
  }


  cartDetails() {
    this.cartItems = this._cartService.cartItems;

    //subscribe to events
    this._cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    )

    this._cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    )

    this._cartService.calculateTotalPrice();
  }

  //increment quantity
  incrementQuantity(cartItem: CartItem) {
    this._cartService.addToCart(cartItem);
  }

  //decrement quantity
  decrementQuantity(cartItem: CartItem) {
    this._cartService.decrementQuantity(cartItem);
  }
  
  //remove cartItem
  remove(cartItem: CartItem)
  {
    this._cartService.remove(cartItem);
  }
}
