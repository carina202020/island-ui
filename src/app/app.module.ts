import { BrowserModule } from '@angular/platform-browser';
import { NgModule,APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { FormGroup, ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { ProductComponent } from './page/product/product.component';
import { ConfigService } from './service/config/config.service';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ProductmodalComponent } from './com/productmodal/productmodal.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { PaymentComponent } from './page/payment/payment.component';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { OrderDetailComponent } from './shared/order-detail/order-detail.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ShopinfoComponent } from './shared/shopinfo/shopinfo.component';
import { MainComponent } from './page/main/main.component';
import { UserformComponent } from './shared/userform/userform.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
registerLocaleData(en);
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductmodalComponent,
    PaymentComponent,
    OrderDetailComponent,
    ShopinfoComponent,
    MainComponent,
    UserformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzCardModule,
    NzListModule,
    NzRadioModule,
    NzGridModule,
    NzModalModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
    NzMessageModule,
    NzAffixModule,
    NzBadgeModule,
    NzStepsModule,
    NzTableModule,
    NzDatePickerModule,
    NzSelectModule,
    NzSelectModule,
    NzFormModule,
    ReactiveFormsModule
    
   
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US },
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigService) => function() {return configService.load();},
      deps: [ConfigService],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
