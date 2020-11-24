import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './../config/config.service';
import { ActivatedRoute } from "@angular/router"
import { Md5 } from 'ts-md5/dist/md5';
import * as CryptoJS from 'crypto-js';
import { appData } from '../../interface/appinfo.model'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public StoreInfo: object;
  private StoreId: string;
  private ApiInfo: appData;
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private route: ActivatedRoute
  ) {

    this.StoreInfo = this.configService.getStoreInfo();
    this.StoreId = this.route.snapshot.firstChild.params.storeID;
    this.ApiInfo = this.StoreInfo[this.StoreId].apiInfo;
  }

  getStoreInfo() {

    // let info= new infoData();
    // info.infoname=(this.StoreInfo[this.StoreId].storeInfo).toString();
    return this.StoreInfo[this.StoreId].storeInfo;
  }
  getAnswer(): any {
    const data = { "appId": "F74B63E1F64F7D161EE2CD666666F27F", "barcodes": ["1585980034279", "1910211514366-2"] }// let F = this.http.post(url,'');
    let url = '/pospal-api2/openapi/v1/productOpenApi/queryProductByBarcodes';
    const signature = Md5.hashStr(this.ApiInfo.appKey + JSON.stringify(data));
    const headers = { headers: new HttpHeaders().set('data-signature', '04FBAD777795DFB33DF949B9DB93C8EF') };
    return this.http.post(url, data, headers)
      .subscribe(response => {
        console.log(response);
      })
  }

  getProductList() {
    const data = {
      "appId": this.ApiInfo.appID,
      "barcodes": ["1585980165468-1", "1585980165468-2", "1585980165468-3", "80005-4",
        "80004-2",
        "80007-4",
        "80008-2",
        "80021-4",
        "80072-4",
        "1585980165468-2",
        "80025-1",
      ]
    }
    let url = '/api/products';
    // const signature = Md5.hashStr(this.ApiInfo.appKey + JSON.stringify(data)).toString();
    // const headers = { headers: new HttpHeaders().set('data-signature', signature) };
    return new Promise((resolve, reject) => {
      this.http.get(url,)
        .toPromise()
        .then((result) => {

          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });

  }
  getProductimg(Barcode) {
    // const data = {
    //   "appId": this.ApiInfo.appID,
    //   "productBarcode": Barcode
    // }
    // let url = '/pospal-api2/openapi/v1/productOpenApi/queryProductImagesByBarcode';
    // const signature = Md5.hashStr(this.ApiInfo.appKey + JSON.stringify(data)).toString();
    // const headers = { headers: new HttpHeaders().set('data-signature', signature) };
    // return new Promise((resolve, reject) => {
    //   this.http.post(url, data, headers)
    //     .toPromise()
    //     .then((result) => {

    //       resolve(result);
    //     })
    //     .catch((err) => {
    //       reject(err);
    //     });
    // });
    const data = {
      "barcode": Barcode
    }
    return new Promise((resolve, reject) => {
      this.http.post('/api/imgs',data)
        .toPromise()
        .then((result) => {

          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });

  }
  getMessage() {
    const data = {
      "key": '0911768292'
    }
    return new Promise((resolve, reject) => {
      this.http.post('/api/getMseeage',data)
        .toPromise()
        .then((result) => {

          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  vMessage(){
    const data = {
      "key": "0911768292",
      "value":4444
    }
    return new Promise((resolve, reject) => {
      this.http.post('/api/verifyMsg',data)
        .toPromise()
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

}

