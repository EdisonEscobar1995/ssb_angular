import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Alert } from 'src/app/entities/alert';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { MenuService } from 'src/app/services/menu.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-alerts',
  templateUrl: './list-alerts.component.html',
  styleUrls: ['./list-alerts.component.scss']
})
export class ListAlertsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['backend', 'operation', 'numberRequests', 'timestamp'];
  alerts: Alert[] | [] = [];
  dataAlerts = new MatTableDataSource<Alert>();
  loading = true;

  constructor(
    private readonly serviceMenu: MenuService,
    private readonly alertService: AlertService,
    private readonly _liveAnnouncer: LiveAnnouncer
  ) {
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    // this.dataAlerts.sort = this.sort;
  }

  ngOnInit(): void {
    this.serviceMenu.getMenuActive().next('alerts');
    this.getAlerts();
  }

  async getAlerts() {
    try {
      this.alerts = await this.alertService.getAlerts();
      this.dataAlerts = new MatTableDataSource(this.alerts);
      this.dataAlerts.sort = this.sort;
      this.dataAlerts.paginator = this.paginator;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      console.error('Error en getAlerts = ', error);
    }
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
