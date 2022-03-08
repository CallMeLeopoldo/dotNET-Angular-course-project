import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PaginationHeaderComponent } from './components/pagination-header/pagination-header.component';
import { PaginationFooterComponent } from './components/pagination-footer/pagination-footer.component';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TextInputComponent } from './text-input/text-input.component';



@NgModule({
  declarations: [PaginationHeaderComponent, PaginationFooterComponent, OrderTotalsComponent, TextInputComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    BsDropdownModule.forRoot()
  ],
  exports: [
    PaginationModule,
    PaginationHeaderComponent,
    PaginationFooterComponent,
    OrderTotalsComponent,
    CarouselModule,
    ReactiveFormsModule,
    BsDropdownModule,
    TextInputComponent


  ]
})
export class SharedModule { }
