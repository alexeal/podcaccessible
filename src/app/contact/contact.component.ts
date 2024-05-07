import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  submitted = false;
  sent = false;
  userForm = new FormGroup({
    from_name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', Validators.required)
  });

  constructor(private formBuilder: FormBuilder) {
    (function () {
      emailjs.init({
        publicKey: "m_jWChGWTh465GxPF",
      });
    })();
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.valid) {
      emailjs.send('podcaccessible_mail', 'template_xnz7t4a', this.userForm.value).then(
        (response) => {
          this.submitted = false;
          this.sent = true;
          this.userForm.reset();
        },
        (error) => {
          console.log('FAILED...', error);
        },
      );
    }

  }
}
