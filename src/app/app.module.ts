import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ApiInterceptor } from "@shared/interceptors";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { IconsModule } from "@shared/modules/icons/icons.module";
import { CustomLoaderModule } from "@shared/modules/custom-loader";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CustomLoaderModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IconsModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
