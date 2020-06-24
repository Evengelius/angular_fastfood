import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CommandComponent} from './views/tables/command/read/all/command.component';
import {NotFoundComponent} from './views/errors/not-found/not-found.component';
import {DrinkComponent} from './views/tables/drink/read/all/drink.component';
import {BurgerComponent} from './views/tables/burger/read/all/burger.component';
import {CommandCreateComponent} from './views/tables/command/create/command-create.component';
import {CommandOneComponent} from './views/tables/command/read/one/command-one.component';
import {CommandEditComponent} from './views/tables/command/edit/command-edit.component';
import {BurgerCreateComponent} from './views/tables/burger/create/burger-create.component';
import {BurgerEditComponent} from './views/tables/burger/edit/burger-edit.component';
import {BurgerOneComponent} from './views/tables/burger/read/one/burger-one.component';
import {DrinkCreateComponent} from './views/tables/drink/create/drink-create.component';
import {DrinkOneComponent} from './views/tables/drink/read/one/drink-one.component';
import {DrinkEditComponent} from './views/tables/drink/edit/drink-edit.component';
import {InvalidUrlGuard} from './guard/invalid-url.guard';
import {RegisterComponent} from './views/tables/user/register/register.component';
import {LoginComponent} from './views/tables/user/login/login.component';
import {AuthGuard} from './guard/auth.guard';
import {UserComponent} from './views/tables/user/read/all/user.component';
import {UserOneComponent} from './views/tables/user/read/one/user-one.component';
import {UserEditComponent} from './views/tables/user/edit/user-edit.component';


const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'commands'},

    // Users
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'users', canActivate: [AuthGuard], component: UserComponent},
    {path: 'users/show/:id', canActivate: [AuthGuard, InvalidUrlGuard], component: UserOneComponent},
    {path: 'users/edit/:id', canActivate: [AuthGuard, InvalidUrlGuard], component: UserEditComponent},

    // Commands
    {path: 'commands', canActivate: [AuthGuard], component: CommandComponent},
    {path: 'commands/create', canActivate: [AuthGuard], component: CommandCreateComponent},
    {path: 'commands/show/:id', canActivate: [AuthGuard, InvalidUrlGuard], component: CommandOneComponent},
    {path: 'commands/edit/:id', canActivate: [AuthGuard, InvalidUrlGuard], component: CommandEditComponent},
    // Drinks
    {path: 'drinks', canActivate: [AuthGuard], component: DrinkComponent},
    {path: 'drinks/create', canActivate: [AuthGuard], component: DrinkCreateComponent},
    {path: 'drinks/show/:id', canActivate: [AuthGuard, InvalidUrlGuard], component: DrinkOneComponent},
    {path: 'drinks/edit/:id', canActivate: [AuthGuard, InvalidUrlGuard], component: DrinkEditComponent},
    // Burgers
    {path: 'burgers', canActivate: [AuthGuard], component: BurgerComponent},
    {path: 'burgers/create', canActivate: [AuthGuard], component: BurgerCreateComponent},
    {path: 'burgers/show/:id', canActivate: [AuthGuard, InvalidUrlGuard], component: BurgerOneComponent},
    {path: 'burgers/edit/:id', canActivate: [AuthGuard, InvalidUrlGuard], component: BurgerEditComponent},
    // Miscellaneous
    {path: '**', component: NotFoundComponent},
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
