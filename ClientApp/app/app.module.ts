import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ModelModule } from "./models/model.module";
import { RoutingConfig } from "./app.routing";
import { StoreModule } from "./store/store.module";
import { ProductSelectionComponent } from "./store/productSelection.component";
import { APP_BASE_HREF } from '@angular/common';
@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, FormsModule, HttpModule, ModelModule,
        RoutingConfig, StoreModule],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
