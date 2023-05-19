import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Entry, Padlet} from "./padlet";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Comment} from "./comment";

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

  getEntriesById(id: string): Observable<Array<Entry>> {
    return this.http.get<Array<Entry>>(`${this.api}/entries/padlet/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getEntryById(id: string): Observable<Entry> {
    return this.http.get<Entry>(`${this.api}/entries/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  createPadlet(padlet: Padlet) {
    return this.http.post(`${this.api}/padlets`, padlet)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  deletePadlet(id: number) {
    return this.http.delete(`${this.api}/padlets/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  createEntry(entry: Entry) {
    return this.http.post(`${this.api}/entries`, entry)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  deleteEntry(id: number) {
    return this.http.delete(`${this.api}/entries/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  createComment(comment: Comment) {
    return this.http.post(`${this.api}/comments`, comment)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  getCommentsByEntryId(entryId: any) {
   return this.http.get<Array<Comment>>(`${this.api}/comments/entry/${entryId}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }

}
