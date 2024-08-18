import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IssueComponent } from './components/issue/issue.component';
import {TableModule} from "primeng/table";
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import {MenubarModule} from "primeng/menubar";
import {ToastModule} from "primeng/toast";
import {TabMenuModule} from "primeng/tabmenu";
import {ButtonDirective} from "primeng/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DialogModule} from "primeng/dialog";
import { HomeComponent } from './components/home/home.component';
import { AddIssueComponent } from './components/add-issue/add-issue.component';
import { UpdateIssueComponent } from './components/update-issue/update-issue.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import {DialogService} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";

@NgModule({
  declarations: [
    AppComponent,
    IssueComponent,
    MenuBarComponent,
    HomeComponent,
    AddIssueComponent,
    UpdateIssueComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TableModule,
    MenubarModule,
    ToastModule,
    TabMenuModule,
    ButtonDirective,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DialogModule,
  ],
  providers: [
  MessageService,
  DialogService,
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
