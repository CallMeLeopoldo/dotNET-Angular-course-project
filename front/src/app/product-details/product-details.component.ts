import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { IProduct } from '../shared/models/product';
import { ShopService } from '../shop/shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: IProduct;

  constructor(
    private shopService: ShopService,
    private activeRoute: ActivatedRoute,
    private bcService: BreadcrumbService) {

      this.bcService.set('@productDetails', ' ');
    }

  ngOnInit(): void {~
    console.log('UPA');
    this.loadProduct(2);
  }

  loadProduct(id: number){
    console.log('UPAole');
    this.shopService.getProduct(+this.activeRoute.snapshot.paramMap.get('id')).subscribe(
      product => {
        this.product = product;
        this.bcService.set('@productDetails', product.name);
    }, error => {
      console.log(error);
    })
  }

}
