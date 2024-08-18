import {Component, OnInit} from '@angular/core';
import {CreateIssueDto} from "../../models/createissuedto";
import {IssueService} from "../../services/issue.service";
import {FormBuilder} from "@angular/forms";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-issue',
  templateUrl: './add-issue.component.html',
  styleUrl: './add-issue.component.css'
})
export class AddIssueComponent implements OnInit {
  issue: CreateIssueDto = {
    title: '',
    description: ''
  };

  constructor(private issueService: IssueService, private formBuilder: FormBuilder, private messageService: MessageService, private router: Router) {
  }

  ngOnInit() {
  }

  AddIssue() {
    this.issueService.createIssue(this.issue).subscribe(() => {
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Issue added successfully!'});
      this.router.navigate(['/issues']);
    }, () => {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to add issue!'});
    });
  }
}
