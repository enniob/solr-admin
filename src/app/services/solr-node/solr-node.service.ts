/**
 * Description: Provides information about system properties, threads, logging settings,
 * system details and health (available in Solrcloud mode) for a node.
 *
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SolrNodeService {

  constructor(private readonly http: HttpClient) { }
    restPath = '/api/node';

  /**
   * Available Paths:
   *      /node/properties
   *      /node/threads
   *      /node/logging
   *      /node/system
   *      /node/health
   */
  get(path: string) {
    return this.http.get<any>(`${this.restPath}/${path}`);
  }
}
