import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkOutFormGroup:FormGroup;
  constructor(private _formBuilder:FormBuilder) { }

  ngOnInit(): void {
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
      })
    })
  }


  onSubmit()
  {
    console.log('dd');
    console.log(this.checkOutFormGroup.get('customer').value.firstName);
  }

  copyShippingAddressToBillingAddress
}
