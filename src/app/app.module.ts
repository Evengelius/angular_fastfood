import { AgmCoreModule } from '@agm/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { ViewsModule } from './views/views.module';
import { ErrorModule } from './views/errors/error.module';

// main layout
import { NavigationModule } from './partials/navigation/navigation.module';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {Ng2Webstorage} from 'ngx-webstorage';
import {HttpClientInterceptor} from './services/auth/http-client.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    // Internal modules
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NavigationModule,
    AppRoutingModule,
    ErrorModule,
    ViewsModule,
    // External modules
    NgxPaginationModule,
    Ng2Webstorage.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
