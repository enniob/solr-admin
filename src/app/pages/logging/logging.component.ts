import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

// SERVICES
import { SolrNodeService } from '../../services/solr-node/solr-node.service';

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.scss']
})
export class LoggingComponent implements OnInit {
  watcher = '';

  logHistory = new MatTableDataSource<any[]>([]);
  displayedColumns: string[] = ['time', 'level', 'core', 'logger', 'message'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private readonly solrNodeService: SolrNodeService) { }

  ngOnInit() {
    this.getLogs();
  }

  reloadData() {
    this.getLogs();
  }

  // PRIVATE FUNCTIONS
  getLogs() {
    this.solrNodeService.get('logging?since=0&wt=json').subscribe(response => {
      this.watcher = response['watcher'];
      this.logHistory = new MatTableDataSource<any[]>(response['history']['docs']);
      this.logHistory.paginator = this.paginator;
    });
  }
}
