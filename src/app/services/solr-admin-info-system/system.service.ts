import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SolrService } from '../solr.service';
import { SolrSystemResponse } from '../../domain/solr-admin-info-system/solr-system-response';

@Injectable({
  providedIn: 'root'
})
export class SystemService extends SolrService {

    path = '/api/node/system';

  constructor(private http: HttpClient) {
      super();
  }

  getData() {
      return this.http.get<SolrSystemResponse>(this.path);
  }
}
