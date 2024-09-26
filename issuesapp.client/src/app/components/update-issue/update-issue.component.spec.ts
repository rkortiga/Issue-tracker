import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateIssueComponent } from './update-issue.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { IssueService } from '../../services/issue.service';
import { MessageService } from 'primeng/api';

describe('UpdateIssueComponent', () => {
    let component: UpdateIssueComponent;
    let fixture: ComponentFixture<UpdateIssueComponent>;
    let mockRouter: jasmine.SpyObj<Router>;
    let mockActivatedRoute: any;
    let mockIssueService: jasmine.SpyObj<IssueService>;
    let mockMessageService: jasmine.SpyObj<MessageService>;

    beforeEach(async () => {
        mockRouter = jasmine.createSpyObj('Router', ['navigate']);
        mockActivatedRoute = {
            paramMap: of({get: (key: string) => '1'})
        };
        mockIssueService = jasmine.createSpyObj('IssueService', ['getIssueById', 'updateIssue', 'deleteIssue']);
        mockMessageService = jasmine.createSpyObj('MessageService', ['add']);

        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule, MenubarModule],
            declarations: [UpdateIssueComponent],
            providers: [
                {provide: IssueService, useValue: mockIssueService},
                {provide: MessageService, useValue: mockMessageService},
                {provide: Router, useValue: mockRouter},
                {provide: ActivatedRoute, useValue: mockActivatedRoute}
            ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(UpdateIssueComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize the form with title and description controls', () => {
        expect(component.updateIssueForm.contains('title')).toBeTrue();
        expect(component.updateIssueForm.contains('description')).toBeTrue();
    });

    it('should load issue data from the service and patch the form', () => {
        const mockIssue = {id: 1, title: 'Test Issue', description: 'Test Description'};
        mockIssueService.getIssueById.and.returnValue(of(mockIssue));

        component.ngOnInit();

        expect(mockIssueService.getIssueById).toHaveBeenCalledWith(1);
        expect(component.updateIssueForm.get('title')?.value).toEqual(mockIssue.title);
        expect(component.updateIssueForm.get('description')?.value).toEqual(mockIssue.description);
    });

    it('should display error message if form is invalid and not submit', () => {
        component.updateIssueForm.setValue({id: 1, title: '', description: ''});

        component.updateIssue();

        expect(mockMessageService.add).toHaveBeenCalledWith({
            severity: 'error',
            summary: 'Error',
            detail: 'Please fill out all required fields'
        });
        expect(mockIssueService.updateIssue).not.toHaveBeenCalled();
    });

    it('should submit form data and navigate on successful update', () => {
        component.updateIssueForm.setValue({id: 1, title: 'Updated Title', description: 'Updated Description'});
        mockIssueService.updateIssue.and.returnValue(of({
            id: 1,
            title: 'Updated Title',
            description: 'Updated Description'
        }));

        component.updateIssue();

        expect(mockIssueService.updateIssue).toHaveBeenCalledWith(
            {id: 1, title: 'Updated Title', description: 'Updated Description'},
            1
        );
        expect(mockMessageService.add).toHaveBeenCalledWith({
            severity: 'success',
            summary: 'Success',
            detail: 'Issue updated successfully!'
        });
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/issues']);
    });

    it('should handle error during update and display error message', () => {
        component.updateIssueForm.setValue({id: 1, title: 'Updated Title', description: 'Updated Description'});
        mockIssueService.updateIssue.and.returnValue(throwError(() => new Error('Update failed')));

        component.updateIssue();

        expect(mockMessageService.add).toHaveBeenCalledWith({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update issue'
        });
    });

    it('should delete the issue and navigate on successful deletion', () => {
        component.updateIssueForm.setValue({id: 1, title: 'Test', description: 'Test'});
        mockIssueService.deleteIssue.and.returnValue(of({id: 1, title: 'Test', description: 'Test'}));

        component.delete();

        expect(mockIssueService.deleteIssue).toHaveBeenCalledWith(1);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/issues']);
    });

    it('should handle error during deletion and display error message', () => {
        component.updateIssueForm.setValue({id: 1, title: 'Test', description: 'Test'});
        mockIssueService.deleteIssue.and.returnValue(throwError(() => new Error('Deletion failed')));

        component.delete();

        expect(mockMessageService.add).toHaveBeenCalledWith({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete issue'
        });
    });
});
