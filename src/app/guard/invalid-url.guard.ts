import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvalidUrlGuard implements CanActivate {


  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    /**
     * items/show/10
     *   0    1   2
     * We get only the id from the url,
     * So we get the second parameter: 2
     */
    const id = +next.url[2].path;

    if (isNaN(id) || id < 1) {
      this.router.navigate(['invalid-url']);
      return false;
    }

    return true;
  }

}
