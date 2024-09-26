import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IssueComponent } from './issue.component';
import { IssueService } from '../../services/issue.service';
import { MessageService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { PaginatorComponent } from '../paginator/paginator.component';
import { TableModule } from 'primeng/table';

describe('IssueComponent', () => {
    let component: IssueComponent;
    let fixture: ComponentFixture<IssueComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, PaginatorModule, TableModule],
            declarations: [IssueComponent, PaginatorComponent],
            providers: [IssueService, MessageService]
        })
        .compileComponents();

        fixture = TestBed.createComponent(IssueComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
