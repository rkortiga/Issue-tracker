import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateIssueComponent } from './update-issue.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { IssueService } from '../../services/issue.service';
import { MessageService } from 'primeng/api';

describe('UpdateIssueComponent', () => {
    let component: UpdateIssueComponent;
    let fixture: ComponentFixture<UpdateIssueComponent>;
    let mockRouter: jasmine.SpyObj<Router>;
    let mockActivatedRoute: any;

    beforeEach(async () => {
        mockRouter = jasmine.createSpyObj('Router', ['navigate']);
        mockActivatedRoute = {
            paramMap: of({get: (key: string) => '1'})
        };

        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule, MenubarModule],
            declarations: [UpdateIssueComponent],
            providers: [
                IssueService,
                MessageService,
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
});
