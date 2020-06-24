import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Drink} from '../../models/tables/drink';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {

  private baseUrl = 'http://localhost:8070/api/drinks';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  // ******************************* POST ******************************* //

  create(drink: any): Observable<Drink> {
    return this.http.post<Drink>(`${this.baseUrl}`, drink, this.httpOptions).pipe(
        tap(() => console.log(`A new drink has been created`))
    );
  }

  // ******************************* GET ******************************* //

  findAll(): Observable<Drink[]> {
    return this.http.get<Drink[]>(`${this.baseUrl}`);
  }

  findOneBy(id: number): Observable<Drink> {
    return this.http.get<Drink>(`${this.baseUrl}/${id}`);
  }

  // ******************************* PUT ******************************* //

  update(id: number, drink: any): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put(url, drink, this.httpOptions).pipe(
        tap(() => console.log(`The drink with the id ${id}, has been updated`))
    );
  }

  // ***************************** DELETE ***************************** //

  destroy(id: number): Observable<Drink> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete<Drink>(url, this.httpOptions).pipe(
        tap(() => console.log(`The drink with the id ${id}, has been deleted`))
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
