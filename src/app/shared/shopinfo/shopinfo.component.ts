import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../../service/data-store/data-store.service';
import { serviceInfo } from './../../interface/serviceinfo.model';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { DisabledTimeFn, DisabledTimePartial } from 'ng-zorro-antd/date-picker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { paymentData } from 'src/app/interface/paymentData.model';
import { dateOption } from 'src/app/interface/dateOption.model';
import { ApiService } from './../../service/api/api.service';
@Component({
  selector: 'app-shopinfo',
  templateUrl: './shopinfo.component.html',
  styleUrls: ['./shopinfo.component.css']
})

export class ShopinfoComponent implements OnInit {
  detailshow: boolean = false;
  service: String;
  serviceInfo: serviceInfo = new serviceInfo();
  validateForm: FormGroup
  constructor(
    private dataStore: DataStoreService,
    public fb: FormBuilder,
    private apiService: ApiService, ) {

  }

  paymentData: paymentData = new paymentData();
  shopData;
  today = new Date();
  date: any = {
    day: '',
    hour: 11,
    minutes: 0,
  };

  dateDisableData: any = {
    hour: Number,
    minutes: Number
  }
  dateOption: dateOption = new dateOption();

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      comment: [null],
      service: [null, [Validators.required]],
      address: [null],
      hour: [null, [Validators.required]],
      minutes: [null, [Validators.required]],
      date: [null, [Validators.required]],
    });
    this.dateOptioninit();

    this.dataStore.getShptData()
      .subscribe(val => {
        this.shopData = val;
      });
    this.validateForm.get("date").valueChanges.subscribe(value => {
      this.changhourOption(value);
    })
    this.validateForm.get("hour").valueChanges.subscribe(value => {
      this.changeminutsOption(value);
    })

  }
  showdetail() {
    this.detailshow = this.detailshow == false ? true : false;
  }
  // getnow() {
  //   this.date.hour = this.today.getHours().toString();

  // }

  onOk(result: Date | Date[] | null): void {
    debugger
    console.log('onOk', result);
  }


  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, this.today) < 0;
  };
  submitForm() {

  }
  formOnchange() {
    this.updateUserForm();
    this.paymentData.send = this.validateForm.valid;
    this.dataStore.sendPaymentData(this.paymentData);
  }
  dateOptioninit() {
    for (let index = 0; index < 10; index++) {
      let item = {};
      this.dateOption.hour.push(index + 10);
    }
    for (let index = 0; index < 6; index++) {
      let item = {};
      this.dateOption.minutes.push(index * 10);
    }
    let date;
    // let testhourl=14;
    date = `${this.today.getFullYear()}/${this.today.getMonth() + 1}/${this.today.getDate()}`
    this.validateForm.controls["date"].setValue(date);
    this.validateForm.controls["hour"].setValue(this.today.getHours());
    // this.validateForm.controls["hour"].setValue(testhourl);
    // this.date.hour=testhourl;

    //隔天
    // if (testhourl > 20) {
    if (this.today.getHours() > 20) {
      date = `${this.today.getFullYear()}/${this.today.getMonth() + 1}/${this.today.getDate() + 1}`
      this.validateForm.controls["date"].setValue(date);
      this.validateForm.controls["hour"].setValue(10);
      this.date.hour = 10;
      this.date.minutes = 0;
      // this.date = date;
    }
    else {
      let tesm = 54;    //分鐘
      if (tesm >= 60) {
        tesm = tesm - 60;
        this.date.hour += 1;
        for (let index = 0; index < this.dateOption.minutes.length; index++) {
          if (tesm > this.dateOption.minutes[index] && tesm < this.dateOption.minutes[index + 1]) {
            this.date.minutes = this.dateOption.minutes[index + 1];
            break;
          }
        }
      }
      else if (tesm >= this.dateOption.minutes[this.dateOption.minutes.length - 1]) {
        this.date.minutes = 0;
        this.date.hour += 1;
      }


      else {
        for (let index = 0; index < this.dateOption.minutes.length; index++) {
          if (tesm > this.dateOption.minutes[index] && tesm < this.dateOption.minutes[index + 1]) {
            this.date.minutes = this.dateOption.minutes[index + 1];
            break;
          }
        }
      }
    }


    this.changhourOption(date);
  }
  changhourOption(value) {
    let input = new Date(value);
    //選擇今天
    if (input.getDate() == this.today.getDate()) {
      let Hours = input.getHours();
      this.dateDisableData.hour = Hours;
    }
  }
  changeminutsOption(value) {



  }
  updateUserForm() {

  }
  getMessage() {
    this.apiService.getMessage();
  }
  vMessage(){
    this.apiService.vMessage();
  }
}