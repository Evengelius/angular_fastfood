import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Command} from '../../models/tables/command';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  private baseUrl = 'http://localhost:8070/api/commands';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  // ******************************* POST ******************************* //

  create(command: any): Observable<Command> {
    return this.http.post<Command>(`${this.baseUrl}`, command, this.httpOptions).pipe(
        tap(() => console.log(`A new command has been created`))
    );
  }

  // ******************************* GET ******************************* //

  findAll(): Observable<Command[]> {
    return this.http.get<Command[]>(`${this.baseUrl}`);
  }

  findOneBy(id: number): Observable<Command> {
    return this.http.get<Command>(`${this.baseUrl}/${id}`);
  }

  // ******************************* PUT ******************************* //

  update(id: number, command: any): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put(url, command, this.httpOptions).pipe(
        tap(() => console.log(`The command with the id ${id}, has been updated`))
    );
  }

  // ***************************** DELETE ***************************** //

  destroy(id: number): Observable<Command> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete<Command>(url, this.httpOptions).pipe(
        tap(() => console.log(`The command with the id ${id}, has been deleted`))
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
