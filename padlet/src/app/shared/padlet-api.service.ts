import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Padlet} from "./padlet";
import {catchError, Observable, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PadletApiService {
  private api = 'http://padlet.s2010456021.student.kwmhgb.at/api';

  constructor(private http: HttpClient) {
  }

  getAllPadlets() {
    return this.http.get<Array<Padlet>>(`${this.api}/padlets`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getSingle(id: string): Observable<Padlet> {
    return this.http.get<Padlet>(`${this.api}/padlets/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
