import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import data from '../../../assets/config.json';
import { ActivatedRoute } from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class ConfigService {


  private static storeInfo: any[] = [];
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute) {


  }
  public load() {
    ConfigService.storeInfo = data.store;
    const configData = data;
    return configData;
  }
  public getStoreInfo() {
    return ConfigService.storeInfo;
  }
}
