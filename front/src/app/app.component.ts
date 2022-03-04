import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from './shared/models/product';
import { IPagination } from './shared/models/pagination';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private basketService: BasketService){}

  ngOnInit(){
    const basket = localStorage.getItem('basket_id');
    console.log(basket);
    if(basket){
      this.basketService.getBasket(basket).subscribe({
        next: response => console.log(response),
        error: error => console.log(error)
      })
    }
   }
}
