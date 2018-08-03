import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRouterModule } from "./app.routing";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import { AppComponent } from './app.component';
import { SiteComponent } from './site/site.component';
import { ModalComponent } from './site/modal/modal.component';
import { HeaderComponent } from './site/header/header.component';
import { FormComponent } from './site/modal/form/form.component';
import { RequestComponent } from './site/request/request.component';
import { ContractComponent } from './site/contract/contract.component';
import { DoorComponent } from './site/request/door/door.component';

import { DelimitNumberPipe } from './site/delimit-number.pipe';
import { PhoneNumberPipe } from './site/phone-number.pipe';
import { LiteralNumberPipe } from './site/literal-number.pipe';

import { HttpService } from './http.service';

mergeAllIconsToOneObject();

@NgModule({
  declarations: [
    AppComponent,
    SiteComponent,
    ModalComponent,
    HeaderComponent,
    FormComponent,
    RequestComponent,
    ContractComponent,
    DoorComponent,
    DelimitNumberPipe,
    PhoneNumberPipe,
    LiteralNumberPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouterModule,
    FontAwesomeModule
  ],
  providers: [ HttpService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

function mergeAllIconsToOneObject() {
  let fa = {...fas, ...fab};
  for (const icon in fa) {
    fa[icon].prefix = 'fas';
  }
  library.add(fa);
}