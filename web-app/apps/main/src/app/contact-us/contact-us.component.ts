import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'vsd-web-app-contact-us',
  standalone: false,
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent {
  formGroup!: FormGroup;
}
