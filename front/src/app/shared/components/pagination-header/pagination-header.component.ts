import { Component, DoCheck, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { ShopService } from 'src/app/shop/shop.service';

@Component({
  selector: 'app-pagination-header',
  templateUrl: './pagination-header.component.html',
  styleUrls: ['./pagination-header.component.css']
})
export class PaginationHeaderComponent implements DoCheck{

  @Input() pageNumber: number;
  @Input() pageSize: number;
  @Input() totalCount: number;
  @Input() startVal: number;
  @Input() endVal: number;

  @ViewChild('search', {static: false}) searchTerm : ElementRef;

  @Output() searchTermEmitter = new EventEmitter<string>();
  @Output() resetTermEmitter = new EventEmitter<string>();


  constructor(private shopService: ShopService) { }
  ngDoCheck(): void {
    this.totalCount = this.shopService.count;
    console.log("UPA ", this.totalCount, " HUE");
  }

  onChangeVal(event: {startVal: number, endVal: number}){
    this.startVal = event.startVal;
    this.endVal = event.endVal;
  }

  onStartSearch(){
    console.log(this.searchTerm);
    this.searchTermEmitter.emit(this.searchTerm.nativeElement.value);
  }

  onStartReset(){
    this.searchTerm.nativeElement.value = '';
    this.resetTermEmitter.emit();
  }

}
