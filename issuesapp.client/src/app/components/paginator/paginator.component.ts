import {Component, OnInit} from '@angular/core';
import {Issue} from "../../models/issue";
import {IssueService} from "../../services/issue.service";

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent implements OnInit {
  issues: Issue[] = [];

  constructor(private issueService: IssueService) {}

  ngOnInit() {
    this.issueService.getIssues().subscribe((data: Issue[]) => {
      this.issues = data;
    });
  }
}
