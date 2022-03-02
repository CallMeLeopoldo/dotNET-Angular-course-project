import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagination } from '../shared/models/pagination';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/shopParams';
import { IProduct } from '../shared/models/product';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = 'https://localhost:5001/api/';

  count: number;

  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams){
    let params = new HttpParams();

    if(shopParams.BrandId){
      params = params.append('brandId', shopParams.BrandId.toString());
    }

    if(shopParams.TypeId){
      params = params.append('typeId', shopParams.TypeId.toString());
    }
    console.log(shopParams.searchTerm);
    if(shopParams.searchTerm){
      params = params.append('search', shopParams.searchTerm);
    }

    params = params.append('sort', shopParams.Sort);
    params = params.append('pageIndex', shopParams.PageNumber);
    params = params.append('pageSize', shopParams.PageSize);
    console.log(params);

    return this.http.get<IPagination>(this.baseUrl + 'products', {observe: 'response', params})
      .pipe(
        map(
          response => {this.count = response.body.data.length; console.log(response.body); return response.body;})
      );
  }


  getProduct(id: number){
    console.log(this.http.get<IProduct>(this.baseUrl + 'products/' + id));
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }

  getBrands(){
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  getTypes(){
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }
}
