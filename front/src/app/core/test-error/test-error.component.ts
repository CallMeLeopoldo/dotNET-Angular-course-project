import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent implements OnInit {

  baseUrl = environment.apiUrl;
  validationErrors: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get404Error(): void {
    this.http.get(this.baseUrl + 'products/42')    .subscribe({
      next: response => console.log(response),
      error: error => {console.log(error); }
    });
  }

  get500Error(): void {
    this.http.get(this.baseUrl + 'buggy/servererror').subscribe({
      next: response => console.log(response),
      error: error => {console.log(error);}
    });
  }

  get400Error(): void {
    this.http.get(this.baseUrl + 'buggy/badrequest').subscribe({
      next: response => console.log(response),
      error: error => {console.log(error); this.validationErrors = error.error.errors;}
    });
  }

  get400ValidationError(): void {
    this.http.get(this.baseUrl + 'products/five')
    .subscribe({
      next: response => console.log(response),
      error: error => {console.log(error); this.validationErrors = error.error.errors;}
    });

  }
}
