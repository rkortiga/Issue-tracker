import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PaginatorComponent } from './paginator.component';
import { IssueService } from '../../services/issue.service';
import { of } from 'rxjs';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { Issue } from '../../models/issue';

describe('PaginatorComponent', () => {
    let component: PaginatorComponent;
    let fixture: ComponentFixture<PaginatorComponent>;
    let issueService: IssueService;
    let mockIssues: Issue[];

    beforeEach(async () => {
        mockIssues = [
            {id: 1, title: 'Issue 1', description: 'Description 1'},
            {id: 2, title: 'Issue 2', description: 'Description 2'},
            {id: 3, title: 'Issue 3', description: 'Description 3'},
            {id: 4, title: 'Issue 4', description: 'Description 4'},
            {id: 5, title: 'Issue 5', description: 'Description 5'},
            {id: 6, title: 'Issue 6', description: 'Description 6'}
        ];

        const issueServiceStub = {
            getIssues: jasmine.createSpy('getIssues').and.returnValue(of(mockIssues))
        };

        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                TableModule,
                RouterModule.forRoot([])
            ],
            declarations: [PaginatorComponent],
            providers: [{provide: IssueService, useValue: issueServiceStub}]
        })
        .compileComponents();

        fixture = TestBed.createComponent(PaginatorComponent);
        component = fixture.componentInstance;
        issueService = TestBed.inject(IssueService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call getIssuesList on ngOnInit', () => {
        spyOn(component, 'getIssuesList').and.callThrough();
        component.ngOnInit();
        expect(component.getIssuesList).toHaveBeenCalled();
    });

    it('should populate issues array when getIssuesList is called', () => {
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

    it('should render issues in the table', () => {
        const compiled = fixture.nativeElement;
        const rows = compiled.querySelectorAll('tbody tr');
        expect(rows.length).toBe(5);
        expect(rows[0].querySelector('td').textContent).toContain('1');
        expect(rows[1].querySelector('td').textContent).toContain('2');
    });

    it('should paginate correctly', () => {
        const paginator = fixture.nativeElement.querySelector('p-paginator');
        expect(paginator).toBeTruthy();
        expect(component.issues.length).toBe(6);
    });
});
