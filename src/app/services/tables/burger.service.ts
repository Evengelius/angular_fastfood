import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Burger} from '../../models/tables/burger';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BurgerService {

  private baseUrl = 'http://localhost:8070/api/burgers';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }


  // ******************************* POST ******************************* //

  create(burger: any): Observable<Burger> {
    return this.http.post<Burger>(`${this.baseUrl}`, burger, this.httpOptions).pipe(
        tap(() => console.log(`A new burger has been created`))
    );
  }

  // ******************************* GET ******************************* //

  findAll(): Observable<Burger[]> {
    return this.http.get<Burger[]>(`${this.baseUrl}`);
  }

  findOneBy(id: number): Observable<Burger> {
    return this.http.get<Burger>(`${this.baseUrl}/${id}`);
  }

  // ******************************* PUT ******************************* //

  update(id: number, burger: any): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put(url, burger, this.httpOptions).pipe(
        tap(() => console.log(`The burger with the id ${id}, has been updated`))
    );
  }

  // ***************************** DELETE ***************************** //

  destroy(id: number): Observable<Burger> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete<Burger>(url, this.httpOptions).pipe(
        tap(() => console.log(`The burger with the id ${id}, has been deleted`))
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
