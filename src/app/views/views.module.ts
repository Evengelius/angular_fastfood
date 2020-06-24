import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AgmCoreModule} from '@agm/core';

import {CalendarModule} from 'angular-calendar';

import {CommandComponent} from './tables/command/read/all/command.component';
import {BurgerComponent} from './tables/burger/read/all/burger.component';
import {DrinkComponent} from './tables/drink/read/all/drink.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {CommandCreateComponent} from './tables/command/create/command-create.component';
import {CommandOneComponent} from './tables/command/read/one/command-one.component';
import {CommandEditComponent} from './tables/command/edit/command-edit.component';
import {BurgerEditComponent} from './tables/burger/edit/burger-edit.component';
import {BurgerCreateComponent} from './tables/burger/create/burger-create.component';
import {BurgerOneComponent} from './tables/burger/read/one/burger-one.component';
import {DrinkOneComponent} from './tables/drink/read/one/drink-one.component';
import {DrinkEditComponent} from './tables/drink/edit/drink-edit.component';
import {DrinkCreateComponent} from './tables/drink/create/drink-create.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {RegisterComponent} from './tables/user/register/register.component';
import {LoginComponent} from './tables/user/login/login.component';
import {UserComponent} from './tables/user/read/all/user.component';
import {UserOneComponent} from './tables/user/read/one/user-one.component';
import {UserEditComponent} from './tables/user/edit/user-edit.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        AgmCoreModule.forRoot({
            // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
            apiKey: ''
        }),
        CalendarModule.forRoot(),
        NgxPaginationModule,
        ReactiveFormsModule,
        MDBBootstrapModule
    ],
    declarations: [
        // Command
        CommandComponent,
        CommandCreateComponent,
        CommandOneComponent,
        CommandEditComponent,
        // Burger
        BurgerComponent,
        BurgerCreateComponent,
        BurgerOneComponent,
        BurgerEditComponent,
        // Drink
        DrinkComponent,
        DrinkCreateComponent,
        DrinkOneComponent,
        DrinkEditComponent,
        // User
        RegisterComponent,
        LoginComponent,
        UserComponent,
        UserOneComponent,
        UserEditComponent,

    ],
    exports: [
        MDBBootstrapModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ViewsModule {
}
