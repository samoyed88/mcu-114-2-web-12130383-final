import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-form',
  imports: [ReactiveFormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss',
})
export class OrderFormComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    address: new FormControl('', [Validators.required, Validators.pattern(/^.+[市縣].+[區鄉鎮市].+/)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^09\d{8}$/)]),
  });

  get isValid(): boolean {
    return this.form.valid;
  }

  get value() {
    return this.form.value;
  }

  reset(): void {
    this.form.reset();
  }
}
