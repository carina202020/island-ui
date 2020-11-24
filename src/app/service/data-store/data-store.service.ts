import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { shopData } from 'src/app/interface/shopData.model';
import { paymentData } from 'src/app/interface/paymentData.model';
@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  data: shopData = new shopData();
  _paymentData:paymentData =new paymentData();
  shoptData = new BehaviorSubject<shopData>(this.data);
  paymentData = new BehaviorSubject<paymentData>(this._paymentData);
  // private _shoptData: any = {};
  constructor() { }
  getShptData() {
    return this.shoptData.asObservable();
  }
  sendShptData(value: shopData) {
    this.shoptData.next(value);
  }
  getPaymentData() {
    return this.paymentData.asObservable();
  }
  sendPaymentData(value: paymentData) {
    this.paymentData.next(value);
  }
}
