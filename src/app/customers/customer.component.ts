import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

import { Customer } from './customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customer = new Customer();
  customerForm!: FormGroup;
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: '',
      sendCatalog: true,
      notification: 'email'
    });
  }

  save(): void {
    // console.log(this.customerForm.form);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  setNotification(selected: string): void {
    const phoneControl = this.customerForm.get('phone');

    if (selected == 'text') {
      phoneControl?.addValidators(Validators.required);
    } else {
      phoneControl?.removeValidators(Validators.required);
    }

    phoneControl?.updateValueAndValidity();
  }
}
