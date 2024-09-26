import { Component, OnDestroy, OnInit } from '@angular/core';
import { UpdateIssueDto } from "../../models/updateIssueDto";
import { IssueService } from "../../services/issue.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-update-issue',
    templateUrl: './update-issue.component.html',
    styleUrl: './update-issue.component.css'
})
export class UpdateIssueComponent implements OnInit, OnDestroy {
    updateIssueForm!: FormGroup;
    private ngUnsubscribe$: Subject<void> = new Subject<void>();

    constructor(
        private activatedRoute: ActivatedRoute,
        private issueService: IssueService,
        private formBuilder: FormBuilder,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit() {
        this.buildForm();
    }

    ngOnDestroy() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }

    buildForm() {
        this.updateIssueForm = this.formBuilder.group({
            id: [{value: null, disabled: true}, Validators.required],
            title: ['', Validators.required],
            description: ['', Validators.required]
        });

        this.activatedRoute.paramMap
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.issueService.getIssueById(parseInt(id))
                .pipe(takeUntil(this.ngUnsubscribe$))
                .subscribe(res => {
                    this.updateIssueForm.patchValue(res);
                });
            }
        });
    }

    updateIssue() {
        if (this.updateIssueForm.invalid) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Please fill out all required fields'
            });
            return;
        }

        const issueData: UpdateIssueDto = this.updateIssueForm.getRawValue();
        this.issueService.updateIssue(issueData, issueData.id).pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe({
            next: res => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Issue updated successfully!'
                });
                this.router.navigate(['/issues']);
            },
            error: err => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to update issue'
                });
            }
        });
    }

    delete() {
        const issueId = this.updateIssueForm.get('id')?.value;
        if (issueId) {
            this.issueService.deleteIssue(issueId).pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe({
                next: () => {
                    this.router.navigate(['/issues']);
                },
                error: err => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to delete issue'
                    });
                }
            });
        }
    }
}
