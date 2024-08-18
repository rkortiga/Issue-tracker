import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";
import {Issue} from "../models/issue";
import {CreateIssueDto} from "../models/createissuedto";
import {Updateissuedto} from "../models/updateissuedto";

class HttpParams {
}

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  constructor(private http: HttpClient) { }

  getIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(`${environment.apiBaseUrl}/Issues`);
  }

  getIssueById(id: number): Observable<Issue> {
    return this.http.get<Issue>(`${environment.apiBaseUrl}/Issues/${id}`);
  }

  createIssue(issue: CreateIssueDto): Observable<Issue> {
    return this.http.post<Issue>(`${environment.apiBaseUrl}/Issues/CreateIssue`, issue);
  }

  updateIssue(id: number, issue: Updateissuedto): Observable<Issue> {
    return this.http.put<Issue>(`${environment.apiBaseUrl}/Issues/UpdateIssue/${id}`, issue);
  }

  deleteIssue(id: number): Observable<Issue> {
    return this.http.delete<Issue>(`${environment.apiBaseUrl}/Issues/DeleteIssue/${id}`);
  }
}
