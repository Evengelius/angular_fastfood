import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {User} from '../../models/auth/user';
import {LocalStorageService} from 'ngx-webstorage';
import {JwtAuthResponse} from '../../models/auth/jwt-auth-response';
import {Login} from '../../models/auth/login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8070/api/users';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }


  // ************************** Authentication ************************** //

  register(user: any): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, user).pipe(
        tap(() => console.log(`A new user has been registered`))
    );
  }

  login(login: Login): Observable<boolean> {
    return this.http.post<JwtAuthResponse>(`${this.baseUrl}/login`, login).pipe(
        map((data) => {
          this.localStorageService.store('authenticationToken', data.authenticationToken);
          this.localStorageService.store('username', data.username);
          console.log('Jwt Token : ' + data.authenticationToken);
          return true;
        })
    );
  }

  isAuthenticated(): boolean {
    return this.localStorageService.retrieve('username') != null;
  }

  logout() {
    this.localStorageService.clear('authenticationToken');
    this.localStorageService.clear('username');
  }

  // ******************************* GET ******************************* //

  findAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  findOneBy(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  // ******************************* PUT ******************************* //

  update(id: number, user: any): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put(url, user, this.httpOptions).pipe(
        tap(() => console.log(`The user with the id ${id}, has been updated`))
    );
  }

  // ***************************** DELETE ***************************** //

  destroy(id: number): Observable<User> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete<User>(url, this.httpOptions).pipe(
        tap(() => console.log(`The user with the id ${id}, has been deleted`))
    );
  }

  // ************************** MISCELLANEOUS *************************** //
  /**
   private static handleError(httpErrorResponse: HttpErrorResponse) {

    let errorMessage = '';
    if (httpErrorResponse.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `An error has occurred: ${httpErrorResponse.error.message}`;
    } else {
      // Server-side error
      errorMessage = `The server has returned the code : ${httpErrorResponse.status}, the message error is : ${httpErrorResponse.message}`;
    }
    // Log the error message in the console
    console.log(errorMessage);

    // Return the error message
    return throwError(errorMessage);
  }
   */
}
