import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Observable } from "rxjs";
import { Issue } from "../models/issue";
import { CreateIssueDto } from "../models/createissuedto";
import { Updateissuedto } from "../models/updateissuedto";

class HttpParams {
}

@Injectable({
    providedIn: 'root'
})
export class IssueService {

    constructor(private http: HttpClient) { }

    getIssues(): Observable<Issue[]> {
        return this.http.get<Issue[]>(`${environment.apiBaseUrl}/Issue/Issues`);
    }

    getIssueById(id: number): Observable<Issue> {
        return this.http.get<Issue>(`${environment.apiBaseUrl}/Issue/Issue/${id}`);
    }

    createIssue(issue: CreateIssueDto): Observable<Issue> {
        return this.http.post<Issue>(`${environment.apiBaseUrl}/Issue/CreateIssue`, issue);
    }

    updateIssue(issue: Updateissuedto, id: number): Observable<Issue> {
        return this.http.put<Issue>(`${environment.apiBaseUrl}/Issue/UpdateIssue/${id}`, issue);
    }

    deleteIssue(id: number): Observable<Issue> {
        return this.http.delete<Issue>(`${environment.apiBaseUrl}/Issue/DeleteIssue/${id}`);
    }
}
