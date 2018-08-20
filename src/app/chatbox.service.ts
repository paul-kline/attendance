import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";
import { MyResponse } from "./MyResponse";
@Injectable({
  providedIn: "root"
})
export class ChatboxService {
  url1: string =
    "https://us-central1-attendance-65296.cloudfunctions.net/helloWorld";
  constructor(private http: HttpClient) {}

  getServerResponse(lat: number, lng: number, user): Observable<MyResponse> {
    const params = new HttpParams().set("lat", "" + lat).set("lng", "" + lng);
    return this.http.get<MyResponse>(this.url1, { params });
  }
}
