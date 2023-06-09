import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Entry, Padlet, User} from "./padlet";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Comment} from "./comment";
import {Rating} from "./rating";
import {PadletUserRole} from "./padletUserRole";

@Injectable()
export class PadletApiService {
  private api = 'http://padlet.s2010456021.student.kwmhgb.at/api';

  constructor(private http: HttpClient) {
  }

  getAllPadlets() {
    return this.http.get<Array<Padlet>>(`${this.api}/padlets`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  updatePadlet(padlet: Padlet) {
    return this.http.put(`${this.api}/padlets/${padlet.id}`, padlet)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllUsers() {
    return this.http.get<Array<User>>(`${this.api}/users`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
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

  updateEntry(entry: Entry) {
    return this.http.put(`${this.api}/entries/${entry.id}`, entry)
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

  getRatingByEntryIdAndUserId(entryId: any, userId: any) {
    return this.http.get<Array<Comment>>(`${this.api}/ratings/entry/${entryId}/${userId}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  saveRating(rating: Rating) {
    return this.http.post(`${this.api}/ratings`, rating)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  updateRating(rating: Rating) {
    return this.http.put(`${this.api}/ratings/${rating.id}`, rating)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  deleteRating(id: number) {
    return this.http.delete(`${this.api}/ratings/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getUserById(currentUserId: number) {
    return this.http.get(`${this.api}/users/${currentUserId}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getUserBySearchTerm(searchTerm: string): Observable<User> {
    return this.http.get<User>(`${this.api}/users/search/${searchTerm}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getInvitesByUserId(userId: number):Observable<Array<PadletUserRole>> {
    return this.http.get<Array<PadletUserRole>>(`${this.api}/users/${userId}/invites`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  saveRole(role: PadletUserRole) {
    return this.http.post(`${this.api}/roles`, role)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  updateRole(role: PadletUserRole) {
    return this.http.put(`${this.api}/roles`, role)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  deleteRole(id: number) {
    return this.http.delete(`${this.api}/roles/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
