import { Component, OnDestroy, OnInit } from '@angular/core';
import { Issue } from "../../models/issue";
import { IssueService } from "../../services/issue.service";
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrl: './paginator.component.css'
})
export class PaginatorComponent implements OnInit, OnDestroy {
    issues: Issue[] = [];
    private ngUnsubscribe$: Subject<void> = new Subject<void>();

    constructor(private issueService: IssueService) {}

    ngOnInit() {
        this.getIssuesList();
    }

    ngOnDestroy() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }

    getIssuesList() {
        this.issueService.getIssues()
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe((data: Issue[]) => {
            this.issues = data;
        });
    }
}
