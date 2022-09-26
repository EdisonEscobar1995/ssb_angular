import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Alert } from 'src/app/entities/alert';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { MenuService } from 'src/app/services/menu.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormAlertComponent } from '../form-alert/form-alert.component';

@Component({
  selector: 'app-list-alerts',
  templateUrl: './list-alerts.component.html',
  styleUrls: ['./list-alerts.component.scss']
})
export class ListAlertsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['backend', 'operation', 'numberRequests', 'timestamp', 'actions'];
  alerts: Alert[] | [] = [];
  dataAlerts = new MatTableDataSource<Alert>();
  loading = true;

  showAdd: boolean = false;

  constructor(
    private readonly serviceMenu: MenuService,
    private readonly alertService: AlertService,
    private readonly _liveAnnouncer: LiveAnnouncer,
    private readonly dialog: MatDialog,
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

  async handleSubmit(values: Alert, operationAlert: string) {
    try {
      const response = await this.alertService.saveAlert(values, operationAlert);
      console.log(response);
      if (response && response.code === "200") {
        this.getAlerts();
      }
    } catch (error) {
      console.error('Error en saveAlert = ', error);
    }
  };

  getDialogConfig(): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '80%';
    dialogConfig.width = '40%';
    return dialogConfig;
  }

  editAlert(element: Alert) {
    const dialogConfig = this.getDialogConfig();
    dialogConfig.data = {
      titleModal: 'Editar Alerta',
      dataEdit: element
    };
    const dialogRef = this.dialog.open(FormAlertComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data)
        if (data.save) {
          // this.loading = true;
          // this.handleSubmit(data.values, data.operationAlert);
        }
      }
    );
  }

  createAlert() {
    const dialogConfig = this.getDialogConfig();
    dialogConfig.data = {
      titleModal: 'Crear Alerta'
    };
    // this.dialog.open(FormAlertComponent, dialogConfig);
    const dialogRef = this.dialog.open(FormAlertComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data)
        if (data.save) {
          this.loading = true;
          this.handleSubmit(data.values, data.operationAlert);
        }
      }
    );
    this.showAdd = true;
  }

  async updateTable() {
    this.showAdd = false;
    // this.showViewEdit = false;
    // await this.searchRates(this.search);
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
