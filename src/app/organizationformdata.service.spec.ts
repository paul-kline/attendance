import { TestBed, inject } from '@angular/core/testing';

import { OrganizationformdataService } from './organizationformdata.service';

describe('OrganizationformdataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrganizationformdataService]
    });
  });

  it('should be created', inject([OrganizationformdataService], (service: OrganizationformdataService) => {
    expect(service).toBeTruthy();
  }));
});
