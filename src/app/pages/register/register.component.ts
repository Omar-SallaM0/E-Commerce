import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [InputGroupModule, InputGroupAddonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  name!: FormControl
  email!: FormControl
  password!: FormControl
  confirmPassword!: FormControl
  registerForm!: FormGroup

  initFormControls() {
    this.name = new FormControl('', [Validators.required, Validators.minLength(3)]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.confirmPassword = new FormControl('', [Validators.required, Validators.minLength(6), this.passwordMatchValidator.bind(this.password)]);
  }

  ngOnInit() {
    this.initFormControls();
    this.registerForm = new FormGroup({
      name: this.name,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    });
  }

  passwordMatchValidator(pass: AbstractControl) : ValidatorFn {
    return (control: AbstractControl): null | {[key: string]: boolean} => {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }
}
  onSubmit(){
    console.log(this.registerForm.value);
  }
}
