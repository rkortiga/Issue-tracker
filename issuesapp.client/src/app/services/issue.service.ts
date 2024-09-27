import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Observable } from "rxjs";
import { Issue } from "../models/issue";
import { CreateIssueDto } from "../models/createIssueDto";
import { UpdateIssueDto } from "../models/updateIssueDto";

@Injectable({
    providedIn: 'root'
})
export class IssueService {
    private readonly apiUrl = `${environment.apiBaseUrl}/issues`;

    constructor(private http: HttpClient) {}

    getIssues(): Observable<Issue[]> {
        return this.http.get<Issue[]>(`${this.apiUrl}`);
    }

    getIssueById(id: number): Observable<Issue> {
        return this.http.get<Issue>(`${this.apiUrl}/${id}`);
    }

    createIssue(issue: CreateIssueDto): Observable<Issue> {
        return this.http.post<Issue>(`${this.apiUrl}`, issue);
    }

    updateIssue(issue: UpdateIssueDto, id: number): Observable<Issue> {
        return this.http.put<Issue>(`${this.apiUrl}/${id}`, issue);
    }

    deleteIssue(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
