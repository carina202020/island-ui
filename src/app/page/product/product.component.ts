import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import data from '../../../assets/config.json';
import { HttpClient } from '@angular/common/http'
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from './../../service/api/api.service';
import { ConfigService } from './../../service/config/config.service';
import { storeData } from './../../interface/storeinfo.model';
import { productData } from './../../interface/productdata.model';
import { productModalData } from './../../interface/productmodal.model';
import { shopList } from './../../interface/shoplist.model';
import { shopData } from './../../interface/shopdata.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DataStoreService } from '../../service/data-store/data-store.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Output() changeView = new EventEmitter<string>();

  ProductList;
  loading = true;
  isVisible = false;
  shopCarisVisible = false;


  constructor(private readonly _httpClient: HttpClient,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private dataStore: DataStoreService,
    private router: Router) {


  }
  // onChange(status: boolean) {
  //   this.right = "30px";
  // }
  info: storeData;
  shopinfo: shopData = new shopData();
  modalData: productModalData;
  quantity: number = 1;
  shopData: shopData = new shopData();;
  ngOnInit(): void {

    console.log(this.shopData);
    this.dataStore.getShptData()
      .subscribe(val => {
        this.shopData = val;
      });

    console.log(this.shopData);

    this.info = this.apiService.getStoreInfo();
    this.modalData = new productModalData();

    this.init()
    // const list = this.apiService.getAnswer();
    // debugger

  }
  async init() {

    let res = await this.apiService.getProductList();

    // let res = {
    //   "status": "success", "messages": [], "data":
    //     [{
    //       "uid": 464027493322090688, "categoryUid": 1549874132536534506,
    //       "name": "9度濃豆漿", "barcode": "1585980165468-1",
    //       "buyPrice": 0.000, "sellPrice": 60.00,
    //       "sellPrice2": 60.00, "stock": -17.000, "maxStock": 0,
    //       "minStock": 0, "pinyin": "9dndj", "customerPrice": 60.00,
    //       "description": "", "isCustomerDiscount": 1, "supplierUid": 0,
    //       "enable": 1, "productionDate": "",
    //       "createdDatetime": "2020-05-11 11:00:19",
    //       "updatedDatetime": "2020-05-11 11:00:19", "attribute1": "n",
    //       "attribute2": "", "attribute3": "", "attribute5":
    //         "2005111057582", "attribute6": "大瓶-無糖"
    //     },
    //     {
    //       "uid": 853734799891194371, "categoryUid":
    //         1549874132536534506, "name": "9度濃豆漿", "barcode": "1585980165468-2", "buyPrice": 0.000, "sellPrice": 60.00, "sellPrice2": 60.00, "stock": -24.000, "maxStock": 0, "minStock": 0, "pinyin": "9dndj", "customerPrice": 60.00, "description": "", "isCustomerDiscount": 1, "supplierUid": 0, "enable": 1, "productionDate": "", "createdDatetime": "2020-05-11 11:00:19", "updatedDatetime": "2020-05-11 11:00:19", "attribute1": "n", "attribute2": "", "attribute3": "", "attribute5": "2005111057582", "attribute6": "大瓶-微糖"
    //     }, { "uid": 1086797995725904072, "categoryUid": 1549874132536534506, "name": "9度濃豆漿", "barcode": "1585980165468-3", "buyPrice": 0.000, "sellPrice": 35.00, "sellPrice2": 35.00, "stock": -6.000, "maxStock": 0, "minStock": 0, "pinyin": "9dndj", "customerPrice": 35.00, "description": "", "isCustomerDiscount": 1, "supplierUid": 0, "enable": 1, "productionDate": "", "createdDatetime": "2020-05-11 11:00:19", "updatedDatetime": "2020-05-11 11:00:19", "attribute1": "n", "attribute2": "", "attribute3": "", "attribute5": "2005111057582", "attribute6": "小瓶-無糖" }, { "uid": 1152078959771106375, "categoryUid": 1549874132536534506, "name": "珍珠豆花", "barcode": "80005-4", "buyPrice": 11.250, "sellPrice": 45.00, "sellPrice2": 45.00, "stock": -2.000, "maxStock": 0, "minStock": 0, "pinyin": "ZZDH", "customerPrice": 45.00, "description": "程程好帥", "isCustomerDiscount": 1, "supplierUid": 0, "enable": 1, "productionDate": "", "createdDatetime": "2020-04-22 09:36:14", "updatedDatetime": "2020-11-10 17:26:14", "attribute1": "y", "attribute2": "", "attribute3": "", "attribute5": "1902121608119", "attribute6": "U大杯", "attribute7": "0" }]
    // }

    this.ProductList = this.organizationData(res["data"]);
    this.loading = false;
  }
  organizationData(data) {
    // hasownproperty
    let ProductData = new Object();
    data.forEach(async element => {
      let key = element.barcode.split('-')[0]
      if (!ProductData.hasOwnProperty(key)) {
        ProductData[key] = new productData();
        ProductData[key].name = element.name;
        ProductData[key].itemList = [];
        ProductData[key].selectItem = '';
        let imgData = await this.apiService.getProductimg(element.barcode);
        // if (imgData["data"].length > 0) {
        //   ProductData[key].imgUrl = imgData["data"][0].imageUrl;
        // }
        // else {
        //   ProductData[key].imgUrl = "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png";
        // }
        ProductData[key].imgUrl = "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png";
      }
      let item = {
        price: element.sellPrice,
        size: element.attribute6,
        key: element.barcode,
        uid: element.categoryUid
      }

      ProductData[key].itemList.push(item);

    });
    return Object["values"](ProductData);


  }
  showModal(item): void {
    this.modalData = item;
    this.isVisible = true;

  }

  handleCancel(): void {
    this.isVisible = false;
    this.quantity = 1;
    this.modalData.selectItem = '';
  }
  updateQ(type: string) {
    switch (type) {
      case "plus":
        this.quantity += 1;
        break;
      case "minus":
        this.quantity -= 1;
        break;
    }

  }
  addToShopCar(data) {

    //購物車
    let item: shopList = new shopList();

    item.name = data.name;
    item.barCode = data.selectItem;

    debugger
    //如果購物車相同的商品只加數量
    let findOrderitem = this.shopData.item.findIndex(element => element["barCode"] == data.selectItem);
    let orderData = data.itemList.find(element => element.key == data.selectItem);
    if (findOrderitem !== -1) {
      this.shopData.item[findOrderitem]["quantity"] += this.quantity;
    }
    //否則加項目
    else {
      item.quantity = this.quantity;
      item.productUid = orderData.uid;
      item.price = orderData.price;
      item.size = orderData.size;
      this.shopData.item.push(item);
    }
    debugger
    this.shopData.shopCount += this.quantity;
    this.shopData.subTotal += this.quantity * orderData.price;
    this.createBasicMessage();
    this.dataStore.sendShptData(this.shopData);



  }
  createBasicMessage(): void {
    this.message.info('已加入購物車');
  }
  goPayment() {
    // debugger
    // this.changeView.emit('payment');
    this.router.navigate([`/payment/${this.route.snapshot.params.storeID}`]);
  }
  showShopCar() {
    this.shopCarisVisible = true;
  }
  shopCarCancel(): void {
    this.shopCarisVisible = false;
  }
}
