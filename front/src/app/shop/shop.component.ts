import { Component, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  brandIdSelected: number = 0;
  typeIdSelected: number = 0;
  shopParams = new ShopParams();
  totalCount: number;
  totalNumPages: number;
  startVal: number;
  endVal: number;
  numPages: Array<number>;
  sortSelected = 'name';
  sortOptions = [
    {name: 'Alphabetical', value:'name'},
    {name: 'Price: Ascending', value:'priceAsc'},
    {name: 'Price: Descending', value:'priceDesc'}
  ]

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.onGetProducts();
    this.onGetBrands();
    this.onGetTypes();
  }

  onGetProducts(){
    console.log(this.shopParams.searchTerm);
    return this.shopService.getProducts(this.shopParams).subscribe(
      (response: IPagination) => {
        this.products = response.data;
        this.shopParams.PageNumber = response.pageIndex;
        this.shopParams.PageSize = response.pageSize;
        this.totalCount = response.count;
        this.onSetProductNumbers();
        this.startVal = this.shopParams.startVal;
        this.endVal = this.shopParams.endVal;
        this.totalNumPages = Math.ceil(this.totalCount/response.pageSize);
        this.numPages = Array(this.totalNumPages).fill(map((x,i)=>i));
      }, error => console.log(error));
  }

  onGetBrands(){
    return this.shopService.getBrands().subscribe(
      (response: IBrand[]) => {
        this.brands = [{id: 0, name: 'All'}, ...response];
      }, error => console.log(error));
  }

  onGetTypes(){
    return this.shopService.getTypes().subscribe(
      (response: IType[]) => {
        this.types = [{id: 0, name: 'All'}, ...response];
      }, error => console.log(error));
  }

  onBrandSelected(brandId: number){
    this.shopParams.BrandId = brandId;
    this.shopParams.PageNumber = 1;
    this.onGetProducts()
  }

  onTypeSelected(typeId: number){
    this.shopParams.TypeId = typeId;
    this.shopParams.PageNumber = 1;
    this.onGetProducts()
  }

  onSortSelected(sortSetting: string){
    this.shopParams.Sort = sortSetting;
    this.shopParams.PageNumber = 1;
    this.onGetProducts();
  }

  onSinglePageChange(event: any){
    this.shopParams = event;
    this.onGetProducts();
  }

  onPageChange(event: any){
    this.shopParams = event;
    this.onGetProducts();
  }

  onUpdateShopValues(event: ShopParams){
    this.shopParams = event;
  }

  onSetProductNumbers(){
    this.shopParams.startVal =
      (this.shopParams.PageNumber -1) * this.shopParams.PageSize + 1;

    this.shopParams.endVal =  this.shopParams.PageNumber * this.shopParams.PageSize;
    const diff = this.shopParams.endVal - this.totalCount;

    if(diff > 0){
      this.shopParams.endVal -= diff;
    }
  }

  onSearch(event: string){
    this.shopParams.searchTerm = event;
    this.onGetProducts();
  }

  onReset(){
    this.shopParams = new ShopParams();
    this.onGetProducts();
  }

}
