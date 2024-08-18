import {Component, OnInit} from '@angular/core';
import {Updateissuedto} from "../../models/updateissuedto";
import {IssueService} from "../../services/issue.service";
import {FormBuilder} from "@angular/forms";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update-issue',
  templateUrl: './update-issue.component.html',
  styleUrl: './update-issue.component.css'
})
export class UpdateIssueComponent implements OnInit {
  issue: Updateissuedto = {
    id: 0,
    title: '',
    description: '',
  };

  constructor(private activatedRoute: ActivatedRoute,
              private issueService: IssueService,
              private formBuilder: FormBuilder,
              private messageService: MessageService,
              private router: Router) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe({next: (params) => {
        const id = params.get('id');

        if (id) {
          this.issueService.getIssueById(parseInt(id)).subscribe({next: (res) => {
            this.issue = res;
            }});
        }
      },
    });
  }

  updateIssue() {
    this.issueService.updateIssue(this.issue, this.issue.id).subscribe({next: (res) => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Issue updated successfully!'});
        this.router.navigate(['/issues']);
    }});
  }

  delete() {
    this.issueService.deleteIssue(this.issue.id).subscribe({next: (res) => {
      this.router.navigate(['/issues']);
      }});
  }
}
