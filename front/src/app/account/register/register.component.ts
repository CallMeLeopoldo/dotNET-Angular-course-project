import { Component, OnInit } from '@angular/core';
import {
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { map, of, switchMap, timer } from 'rxjs';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errors: string[];

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      displayName: [null, Validators.required],
      email: [null,
        [Validators.required, Validators.email],
        [this.validateEmailNotTaken()]
      ],
      password: [null, [Validators.required]],
    });
  }

  onSubmit() {
    this.accountService.register(this.registerForm.value).subscribe({
      next: (response) => this.router.navigate(['/shop']),
      error: (error) => {
        console.log(error.error);
        this.errors = error.error.errors;
      },
    });
  }

  validateEmailNotTaken(): AsyncValidatorFn {
    return (control) => {
      return timer(500).pipe(
        switchMap((response) => {
          if (!control.value) {
            return of(null);
          }
          console.log(typeof(control.value));
          return this.accountService.checkEmailExits(control.value).pipe(
            map((res) => {
              return res ? { emailExists: true } : null;
            })
          );
        })
      );
    };
  }
}
