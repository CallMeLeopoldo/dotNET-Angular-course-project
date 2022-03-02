import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {

  error: any;
  navigation: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.navigation = this.router.getCurrentNavigation();
    this.error = navigation?.extras?.state?.['e'];
  }

  ngOnInit(): void {
    console.log(this.navigation);
  }

}
