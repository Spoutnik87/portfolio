import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app.routes";
import { AppComponent } from "./app.component";

export const APP_ID = "cv_angular";

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: APP_ID }),
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  exports: [AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
