import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {IssueComponent} from "./components/issue/issue.component";
import {AddIssueComponent} from "./components/add-issue/add-issue.component";
import {UpdateIssueComponent} from "./components/update-issue/update-issue.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'issues',
    component: IssueComponent
  },
  {
    path: 'issues/add',
    component: AddIssueComponent
  },
  {
    path: 'issues/update/:id',
    component: UpdateIssueComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
