import { TestBed } from '@angular/core/testing';

import { SolrNodeService } from './solr-node.service';

describe('SolrNodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SolrNodeService = TestBed.get(SolrNodeService);
    expect(service).toBeTruthy();
  });
});
