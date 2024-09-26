import { TestBed } from '@angular/core/testing';

import { IssueService } from './issue.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('IssueService', () => {
    let service: IssueService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(IssueService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
