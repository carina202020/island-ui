import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataStoreService } from '../../service/data-store/data-store.service';
import { ActivatedRoute, Router } from "@angular/router";
import { paymentData } from 'src/app/interface/paymentdata.model';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  submit = false;
  @Output() changeView = new EventEmitter<string>();;
  constructor(private dataStore: DataStoreService,
    private router: Router,
    private route: ActivatedRoute, ) { }
  paymentData: paymentData = new paymentData();
  ngOnInit(): void {
    this.dataStore.getPaymentData()
      .subscribe(val => {
        this.paymentData = val;
      });
      console.log(this.paymentData);
  }
  current = 0;

  index = 0;

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }

  done(): void {
    console.log('done');
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 0;
        break;
      }
      case 1: {
        this.index = 1;
        break;
      }
      case 2: {
        this.index = 2;
        break;
      }

    }
  }
  goproduct() {
    this.router.navigate([`/product/${this.route.snapshot.params.storeID}`]);
    // this.changeView.emit('product');
  }
  submitenable() {
    this.submit = true;
  }
}
