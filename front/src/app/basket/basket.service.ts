import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem } from '../shared/basket';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl = environment.apiUrl;

  private basketSource = new BehaviorSubject(null);

  basket$ = this.basketSource.asObservable();

  private basketPrices = new BehaviorSubject(null);

  basketPrices$ = this.basketPrices.asObservable();

  constructor(private http: HttpClient) { }

  getBasket(id: string){
    return this.http.get(this.baseUrl + 'basket?id=' + id)
      .pipe(
        map(basket => {
          this.basketSource.next(basket);
          this.calculateTotals();
          return basket;
        })
      );
  }

  setBasket(basket: IBasket){
    return this.http.post(this.baseUrl + 'basket', basket).subscribe({

      next:  basket => { this.basketSource.next(basket); this.calculateTotals()},
      error: error => console.log(error)

    })
  }

  getCurrentBasketValue(){
    return this.basketSource.value;
  }

  addItemToBasket(product: IProduct, quantity = 1){
    console.log(product);
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(product, quantity);
    console.log(itemToAdd);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateQuantity(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  incrementItemQuantity(item: IBasketItem){
    const basket = this.getCurrentBasketValue();
    const index = basket.items.findIndex(x => x.id === item.id);
    basket.items[index].quantity += 1;
    this.setBasket(basket);
  }

  decrementItemQuantity(item: IBasketItem){
    const basket = this.getCurrentBasketValue();
    const index = basket.items.findIndex(x => x.id === item.id);
    if(basket.items[index].quantity > 1){
      basket.items[index].quantity--;
    }
    else{
      this.removeItemFromBasket(item);
    }
    this.setBasket(basket);
  }

  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    if(basket.items.some(x => x.id === item.id)){
      basket.items = basket.items.filter(i => i.id !== item.id);

      if(basket.items.length > 0){
        this.setBasket(basket);
      }
      else{
        this.deleteBasket(basket);
      }
    }
  }

  private deleteBasket(basket: any) {
    return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe({

      next: () => {
        this.basketSource.next(null);
        this.basketPrices.next(null);
        localStorage.removeItem('basket_id');
      }

    });

  }

  private calculateTotals(){
    const basket = this.getCurrentBasketValue();
    const shipping = 0;
    const subtotal = basket.items.reduce((a,b) => (b.price * b.quantity) + a, 0);
    const total = subtotal + shipping;
    this.basketPrices.next({shipping, subtotal, total});
  }

  //Helper
  private addOrUpdateQuantity(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): any {
    const index = items.findIndex(x => x.id == itemToAdd.id);
    if(index === -1 ){
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }
    else{
      items[index].quantity += quantity;
    }
    return items;
  }

  //Helper
  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  //Helper
  private mapProductItemToBasketItem(product: IProduct, quantity: number): IBasketItem {
    return {
      id: product.id,
      productName: product.name,
      price: product.price,
      quantity,
      pictureUrl: product.pictureUrl,
      brand: product.brand,
      type: product.type
    };
  }
}
