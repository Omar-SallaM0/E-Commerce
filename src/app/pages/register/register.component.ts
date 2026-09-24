import { Component, ViewEncapsulation } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { IRegister } from '../../core/interfaces/iregister';

//import { NotifecationsService } from '../../core/service/notifecations.service';
//import { UserDataService } from '../../core/service/user-data.service';
import { AuthServiceService } from '../../core/services/auth.service';
import { SharedModule } from '../../../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent {
  name!: FormControl;
  email!: FormControl;
  password!: FormControl;
  rePassword!: FormControl;
  registrationForm!: FormGroup;
  isRegisterd: boolean = false;

  constructor(
    private _authService: AuthServiceService,
    //private _notifecationsService: NotifecationsService,
    private _router: Router,
    //private _userData: UserDataService
  ) {
    this.initFormControls();
    this.initFormGroupe();
  }

  initFormControls(): void {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]);
    this.rePassword = new FormControl('', [
      Validators.required,
      this.passwordMatch(this.password),
    ]);
  }

  initFormGroupe(): void {
    this.registrationForm = new FormGroup({
      name: this.name,
      email: this.email,
      password: this.password,
      rePassword: this.rePassword,
    });
  }

  passwordMatch(pass: AbstractControl): ValidatorFn {
    return (rePass: AbstractControl): null | { [key: string]: boolean } => {
      if (pass.value !== rePass.value || rePass.value === '') {
        return { passNotMatch: true };
      } else return null;
    };
  }

  submit() {
    if (this.registrationForm.valid) {
      this.siginUp(this.registrationForm.value);
      this.isRegisterd = true;
    } else {
      this.registrationForm.markAllAsTouched();
      Object.keys(this.registrationForm.controls).forEach((control) =>
        this.registrationForm.controls[control].markAsDirty()
      );
    }
  }

  siginUp(data: IRegister): void {
    this._authService.register(data).subscribe({
      next: (response) => {
        if (response._id) {
       //   this._notifecationsService.showSuccess('success', 'success register');
          const { username, password } = data;
          this._authService.login({ username, password }).subscribe((next) => {
            localStorage.setItem('token', response._id);
            localStorage.setItem('username', response.name);
            this._router.navigate(['user']);
            //this._userData.userName.next(response.name);
          });
        }
      },
      error: (err) => {
      //  this._notifecationsService.showError('Error', err.error.error);
      console.log(err.error.error);
      },
    });
  }
}
