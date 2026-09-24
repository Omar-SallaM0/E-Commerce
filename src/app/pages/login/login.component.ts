import { Message } from 'primeng/api';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { AuthServiceService } from '../../core/services/auth.service';
import { ILogin } from '../../core/interfaces/iregister';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  username!: FormControl;
  password!: FormControl;
  loginForm!: FormGroup;

  constructor(
    private authService_: AuthServiceService,
  //  private _notifecationsService: NotifecationsService,
    private router: Router,
    //private _userData: UserDataService
  ) {
    this.initFormControls();
    this.initFormGroupe();
  }

  initFormControls(): void {
    this.username = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]);
  }

  ngOnInit(): void {
    this.loginForm.patchValue({
      username: 'emilys',
      password: 'emilyspass'
    });
  }

  initFormGroupe(): void {
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password,
    });
  }

  submit() {
    if (this.loginForm.valid) {
      this.siginIn(this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
      Object.keys(this.loginForm.controls).forEach((control) =>
        this.loginForm.controls[control].markAsDirty()
      );
    }
  }

  siginIn(data: ILogin): void {
    this.authService_.login(data).subscribe({
      next: (response) => {
        //  this._notifecationsService.showSuccess('success', 'success login');
        localStorage.setItem('token', response.accessToken);
        //  this._userData.userName.next(response.name);
        localStorage.setItem('username', response.username);
        this.router.navigate(['home']);
      },
      error: (err) => {
       // this._notifecationsService.showError('Error', err.error.error);
       console.log(err.error.error);
      },
    });
  }
}
