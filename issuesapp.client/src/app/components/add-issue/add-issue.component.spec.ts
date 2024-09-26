import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddIssueComponent } from './add-issue.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { Router } from '@angular/router';
import { IssueService } from '../../services/issue.service';
import { of, throwError } from 'rxjs';

describe('AddIssueComponent', () => {
    let component: AddIssueComponent;
    let fixture: ComponentFixture<AddIssueComponent>;
    let mockIssueService: jasmine.SpyObj<IssueService>;
    let mockMessageService: jasmine.SpyObj<MessageService>;
    let mockRouter: jasmine.SpyObj<Router>;

    beforeEach(async () => {
        mockIssueService = jasmine.createSpyObj('IssueService', ['createIssue']);
        mockMessageService = jasmine.createSpyObj('MessageService', ['add']);
        mockRouter = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule, MenubarModule],
            declarations: [AddIssueComponent],
            providers: [
                {provide: IssueService, useValue: mockIssueService},
                {provide: MessageService, useValue: mockMessageService},
                {provide: Router, useValue: mockRouter}
            ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(AddIssueComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a form with title and description controls', () => {
        expect(component.issueForm.contains('title')).toBeTrue();
        expect(component.issueForm.contains('description')).toBeTrue();
    });

    it('should mark form as invalid when empty', () => {
        expect(component.issueForm.invalid).toBeTrue();
    });

    it('should mark form as valid when required fields are filled', () => {
        component.issueForm.setValue({title: 'Test Title', description: 'Test Description'});
        expect(component.issueForm.valid).toBeTrue();
    });

    it('should not submit the form if invalid', () => {
        component.issueForm.setValue({title: '', description: ''});
        component.addIssue();
        expect(mockIssueService.createIssue).not.toHaveBeenCalled();
        expect(mockMessageService.add).toHaveBeenCalledWith({
            severity: 'error',
            summary: 'Error',
            detail: 'Please fill out all required fields'
        });
    });

    it('should call createIssue and navigate on successful form submission', () => {
        component.issueForm.setValue({title: 'Test Title', description: 'Test Description'});
        mockIssueService.createIssue.and.returnValue(of({id: 1, title: 'Test Title', description: 'Test Description'}));

        component.addIssue();

        expect(mockIssueService.createIssue).toHaveBeenCalledWith({
            title: 'Test Title',
            description: 'Test Description'
        });
        expect(mockMessageService.add).toHaveBeenCalledWith({
            severity: 'success',
            summary: 'Success',
            detail: 'Issue added successfully'
        });
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/issues']);
    });

    it('should display error message if createIssue fails', () => {
        component.issueForm.setValue({title: 'Test Title', description: 'Test Description'});
        mockIssueService.createIssue.and.returnValue(throwError(() => new Error('Failed to add issue')));

        component.addIssue();

        expect(mockIssueService.createIssue).toHaveBeenCalled();
        expect(mockMessageService.add).toHaveBeenCalledWith({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to add issue'
        });
    });
});
