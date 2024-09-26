import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreateIssueDto } from "../../models/createissuedto";
import { IssueService } from "../../services/issue.service";
import { MessageService } from "primeng/api";
import { Router } from "@angular/router";
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-add-issue',
    templateUrl: './add-issue.component.html',
    styleUrl: './add-issue.component.css'
})
export class AddIssueComponent implements OnInit, OnDestroy {
    issueForm!: FormGroup;
    private ngUnsubscribe$: Subject<void> = new Subject<void>();

    constructor(private issueService: IssueService,
                private messageService: MessageService,
                private router: Router,
                private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.initializeForm();
    }

    ngOnDestroy() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }

    initializeForm() {
        this.issueForm = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required]
        });
    }

    addIssue() {
        if (this.issueForm.invalid) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Please fill out all required fields'
            });
            return;
        }

        const issueData: CreateIssueDto = this.issueForm.value;

        this.issueService.createIssue(issueData)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(() => {
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Issue added successfully'
            });
            this.router.navigate(['/issues']);
        }, (error: any) => {
            console.error('Error creating issue:', error);
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to add issue'
            });
        });
    }
}
