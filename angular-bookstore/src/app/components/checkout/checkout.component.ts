import { CartService } from './../../services/cart.service';
import { CartItem } from 'src/app/common/cart-item';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkOutFormGroup:FormGroup;

  cartItems:CartItem[]=[];
  totalPrice:number=0;

  constructor(private _formBuilder:FormBuilder,private _cartService:CartService) { }

  ngOnInit(): void {

    this.cartDetails();

    this.checkOutFormGroup = this._formBuilder.group({
      customer : this._formBuilder.group({
        firstName :[''],
        lastName : [''],
        email : ['']
      }),
      shippingAddress: this._formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipcode:['']
      }),
      billingAddress: this._formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipcode:['']
      }),
      creditCard: this._formBuilder.group({
        cardType:[''],
        nameOnCard:[''],
        cardNumber:[''],
        cvv:[''],
        expirationMonth:[''],
        expirationYear:['']
      })
    })
  }


  onSubmit()
  {
    console.log('dd');
    console.log(this.checkOutFormGroup.get('customer').value.firstName);
  }

  copyShippingAddressToBillingAddress(event)
  {
      if(event.target.checked)
      {
        this.checkOutFormGroup.controls.billingAddress.setValue(this.checkOutFormGroup.controls.shippingAddress.value);
      }
      else
      {
        this.checkOutFormGroup.controls.billingAddress.reset();
      }
  }


  cartDetails()
  {
    this.cartItems = this._cartService.cartItems;
    this._cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    )

    this._cartService.calculateTotalPrice();
  }
}
