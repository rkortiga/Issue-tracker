import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IssueComponent } from './issue.component';
import { IssueService } from '../../services/issue.service';
import { of } from 'rxjs';
import { PaginatorModule } from 'primeng/paginator';
import { PaginatorComponent } from '../paginator/paginator.component';
import { TableModule } from 'primeng/table';
import { Issue } from '../../models/issue';
import { RouterModule } from '@angular/router';

describe('IssueComponent', () => {
    let component: IssueComponent;
    let fixture: ComponentFixture<IssueComponent>;
    let issueService: IssueService;
    let mockIssues: Issue[];

    beforeEach(async () => {
        mockIssues = [
            {id: 1, title: 'Test Issue 1', description: 'Description 1'},
            {id: 2, title: 'Test Issue 2', description: 'Description 2'}
        ];

        const issueServiceStub = {
            getIssues: jasmine.createSpy('getIssues').and.returnValue(of(mockIssues))
        };

        await TestBed.configureTestingModule({
            imports: [RouterModule.forRoot([]), HttpClientTestingModule, PaginatorModule, TableModule],
            declarations: [IssueComponent, PaginatorComponent],
            providers: [{provide: IssueService, useValue: issueServiceStub}]
        })
        .compileComponents();

        fixture = TestBed.createComponent(IssueComponent);
        component = fixture.componentInstance;
        issueService = TestBed.inject(IssueService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call getIssuesList on ngOnInit', () => {
        spyOn(component, 'getIssuesList');
        component.ngOnInit();
        expect(component.getIssuesList).toHaveBeenCalled();
    });

    it('should set issues array when getIssuesList is called', () => {
        component.getIssuesList();
        expect(issueService.getIssues).toHaveBeenCalled();
        expect(component.issues).toEqual(mockIssues);
    });

    it('should unsubscribe from observables on ngOnDestroy', () => {
        const ngUnsubscribeSpy = spyOn(component['ngUnsubscribe$'], 'next');
        const ngUnsubscribeCompleteSpy = spyOn(component['ngUnsubscribe$'], 'complete');
        component.ngOnDestroy();
        expect(ngUnsubscribeSpy).toHaveBeenCalled();
        expect(ngUnsubscribeCompleteSpy).toHaveBeenCalled();
    });

    it('should render the paginator component', () => {
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('app-paginator')).toBeTruthy();
    });
});
