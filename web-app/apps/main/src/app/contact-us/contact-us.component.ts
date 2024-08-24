import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'vsd-web-app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent {
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      name: [null, [Validators.required]],
      emailId: [null, [Validators.required]],
      telephone: [null, [Validators.required]],
      message: [null, [Validators.required]],
    });
  }
}
