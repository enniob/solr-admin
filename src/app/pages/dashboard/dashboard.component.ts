import { Component, OnInit } from '@angular/core';
import { SystemService } from '../../services/solr-admin-info-system/system.service';
import { SolrSystemResponse } from '../../domain/solr-admin-info-system/solr-system-response';
import { MatDialog } from '@angular/material';
import { SolrVersionDialogComponent } from '../../dialogs/solr-version-dialog/solr-version-dialog.component';
import { SystemData } from '../../domain/solr-admin-info-system/system-data';
import { JvmData } from '../../domain/solr-admin-info-system/jvm-data';
import { InfoDialogComponent } from '../../dialogs/info-dialog/info-dialog.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    data: SolrSystemResponse;
    systemData: SystemData;
    jvmData: JvmData;

    // System memory
    totalPhysicalMemory: number;
    usedPhysicalMemory: number;
    usedPhysicalMemoryPercent: number;
    usedSwapSpace: number;
    usedSwapSpacePercent: number;

    // CPU
    cpuUtilization: number;
    processCpuUtilization: number;

    // Files
    fileDescriptorUtilization: number;


    constructor(private systemService: SystemService, public dialog: MatDialog) { }

    ngOnInit() {
        this.systemService.getData().subscribe(
            response => {
                this.handleResponse(response);
            },
            err => {
                console.error(err);
            }
        );
    }

    handleResponse(data: SolrSystemResponse) {
        this.data = data;
        this.processSystemData(data.system);
        this.processJvmData(data.jvm);
    }
    processJvmData(jvm: JvmData): any {
        this.jvmData = jvm;
    }
    processSystemData(system: SystemData): any {
        this.systemData = system;
        this.cpuUtilization = 100 * (system.systemLoadAverage / system.availableProcessors);
        this.totalPhysicalMemory = system.totalPhysicalMemorySize;
        this.usedPhysicalMemory = system.totalPhysicalMemorySize - system.freePhysicalMemorySize;
        this.usedPhysicalMemoryPercent = 100 * (this.usedPhysicalMemory / system.totalPhysicalMemorySize);
        this.fileDescriptorUtilization = 100 * (system.openFileDescriptorCount / system.maxFileDescriptorCount);
        this.usedSwapSpace = system.totalSwapSpaceSize - system.freeSwapSpaceSize;
        this.usedSwapSpacePercent = 100 * (this.usedSwapSpace / system.totalSwapSpaceSize);
        this.processCpuUtilization = 100 * (system.processCpuLoad / system.availableProcessors);
    }

    openSolrVersionDialog(): void {
        this.dialog.open(SolrVersionDialogComponent, {
            data: this.data
        });
    }


    openJVMDialog(): void {
        this.dialog.open(InfoDialogComponent, {
            data: {
                title: 'JVM Information',
                content: this.jvmData.name + ' v' + this.jvmData.version
            }
        });
    }

}
