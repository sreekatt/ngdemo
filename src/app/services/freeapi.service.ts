import { Injectable } from '@angular/core';
import { HttpClient, HttpParams , HttpHeaders ,HttpErrorResponse } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PostsModel } from '../models/postsModel';
import { filter, map } from 'rxjs/operators';
import { SuperBowlStats } from '../../app/models/superbowl'

@Injectable({
  providedIn: 'root'
})
export class FreeapiService {

  private _url1:string = 'https://jsonplaceholder.typicode.com/posts'
  private _url2:string = 'https://jsonplaceholder.typicode.com/comments'

  private _issUrl = 'https://api.wheretheiss.at/v1/satellites/25544';

  // private _url3:string = 'http://samples.openweathermap.org/data/2.5/history/city?q=Warren,OH&appid=b6907d289e10d714a6e88b30761fae22'

  private _url4:string = '../../assets/data/superbowl.json';

  private _url5:string = 'https://ipinfo.io/geo';

  public headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

  constructor(private _httpClient: HttpClient) { }

  getPosts(): Observable<any> {
    return this._httpClient.get(this._url1)
  }

  getCommentsByParameter(): Observable<any> {
    let params1 = new HttpParams().set('postId', '2');
    return this._httpClient.get(this._url2, {params: params1});
  }

  post(newPost:PostsModel): Observable<any> {
    return this._httpClient.post(this._url1, newPost);
  }

  getIss(): Observable<any> {
    return this._httpClient.get(this._issUrl)
  }

  getSuperBowlStats(): Observable<SuperBowlStats[]> {
    return this._httpClient.get<SuperBowlStats[]>(this._url4);
  }

  getCoords():Observable<any>{
    return this._httpClient.get(this._url5)
 }

}



/*
export class EmployeeService {

  private _url: string = "/assets/data/employees.json";

  constructor(private http:HttpClient) { }

  getEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this._url).pipe(
      catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse){
    return observableThrowError(error.message || "Server Error" )
  }

}
*/
