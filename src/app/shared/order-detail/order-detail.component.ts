import { Component, OnInit, Input } from '@angular/core';
import { DataStoreService } from '../../service/data-store/data-store.service';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  constructor(private dataStore: DataStoreService, ) { }
  shopData;

  @Input() detailshow;
  ngOnInit(): void {
    this.dataStore.getShptData()
      .subscribe(val => {
        this.shopData = val;
      });

  }
  updateQ(type, data, index) {
    switch (type) {
      case "plus":
        this.shopData.item[index].quantity += 1;
        this.shopData.shopCount += 1;
        this.shopData.subTotal += this.shopData.item[index].price;
        break;
      case "minus":

        this.shopData.item[index].quantity -= 1;
        this.shopData.shopCount -= 1;
        this.shopData.subTotal -= this.shopData.item[index].price;
        //數量等於 0 刪除item
        if (this.shopData.item[index].quantity == 0) {
          this.shopData["item"].splice(index, 1);
        }
        break;

      default:
        break;
    }

  }

}
