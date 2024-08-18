import {Component, OnInit} from '@angular/core';
import {Issue} from "../../models/issue";
import {IssueService} from "../../services/issue.service";

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrl: './issue.component.css'
})
export class IssueComponent implements OnInit {
  issues: Issue[] = [];

  constructor(private issueService: IssueService) {}

  ngOnInit() {
    this.issueService.getIssues().subscribe((data: Issue[]) => {
      this.issues = data;
    });
  }
}
