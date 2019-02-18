import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app.routes";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { services } from "./services";

export const APP_ID = "portfolio";

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: APP_ID }),
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  exports: [AppRoutingModule],
  providers: [...services],
  bootstrap: [AppComponent]
})
export class AppModule {}
