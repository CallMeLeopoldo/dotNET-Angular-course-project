import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ShopParams } from '../../shopParams';

@Component({
  selector: 'app-pagination-footer',
  templateUrl: './pagination-footer.component.html',
  styleUrls: ['./pagination-footer.component.css']
})
export class PaginationFooterComponent implements OnInit {
  @Input() shopParams: ShopParams;
  @Input() numPages: Array<number>;
  @Input() totalNumPages: number;
  @Input() totalCount: number;

  @Output() singlePage = new EventEmitter<ShopParams>();
  @Output() changePage = new EventEmitter<ShopParams>();
  @Output() shopValues = new EventEmitter<ShopParams>();

  startVal: number;
  endVal: number;



  constructor() { }

  ngOnInit(): void {
    this.onSetProductNumbers()
  }

  onSinglePageChange(change: number){

    const toChange = this.shopParams.PageNumber + change;
    console.log("WOOPW " + toChange);
    if(toChange > 0 &&
      toChange < this.totalNumPages + 1){
        console.log("GO TO " + toChange);
        this.shopParams.PageNumber = toChange;
        this.onSetProductNumbers();
        this.singlePage.emit(this.shopParams);

    }

  }

  onPageChange(change: number){

    const toChange = change;
    console.log("WOOPW " + toChange);
    if(toChange > 0 &&
      toChange < this.totalNumPages + 1){
        console.log("GO TO " + toChange);
        this.shopParams.PageNumber = toChange;
        this.onSetProductNumbers();
        this.changePage.emit(this.shopParams);
    }
  }

  onSetProductNumbers(){
    this.shopParams.startVal =
      (this.shopParams.PageNumber -1) * this.shopParams.PageSize + 1;

    this.shopParams.endVal =  this.shopParams.PageNumber * this.shopParams.PageSize;
    console.log(this.totalCount);
    const diff = this.shopParams.endVal - this.totalCount;

    if(diff > 0){
      this.shopParams.endVal -= diff;
    }

    this.shopValues.emit(this.shopParams);


  }

}
