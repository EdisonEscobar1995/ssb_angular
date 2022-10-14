import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, startWith } from 'rxjs';
import { Company } from 'src/app/entities/company';
import { CompanyService } from 'src/app/services/company/company.service';
import { MenuService } from 'src/app/services/menu.service';
import { FormCompanyComponent } from '../form-company/form-company.component';

@Component({
  selector: 'app-list-companies',
  templateUrl: './list-companies.component.html',
  styleUrls: ['./list-companies.component.scss']
})
export class ListCompaniesComponent implements OnInit, OnDestroy {
  // displayedColumns: string[] = ['id', 'description', 'idCountry', 'param', 'actions'];
  displayedColumns: string[] = ['id', 'description', 'idCountry', 'param'];
  companies: Company[] | [] = [];
  companiesAll: Company[] | [] = [];
  dataCompanies: any;
  loading = true;
  countriesAllOptions: string[] = [];
  countriesOptions: string[] = [];
  searchedOptions: string[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly serviceMenu: MenuService,
    private readonly companyService: CompanyService,
    private readonly _liveAnnouncer: LiveAnnouncer,
    private readonly dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.serviceMenu.getMenuActive().next('companies');
    this.getCompanies();
  }

  _filter($event: any) {
    const value = $event.target.value;
    const filterValue = this._normalizeValue(value);
    const dataCountriesFilter = this.countriesAllOptions.filter(street => this._normalizeValue(street).includes(filterValue));
    this.countriesOptions = dataCountriesFilter;
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  ngOnDestroy() {
    // this.serviceMenu.getMenuActive().unsubscribe();
  }

  getDialogConfig(): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '80%';
    dialogConfig.width = '52%';
    return dialogConfig;
  }

  editCompany(element: Company) {
    const dialogConfig = this.getDialogConfig();
    dialogConfig.data = {
      titleModal: 'Editar Compañia',
      dataEdit: element
    };
    const dialogRef = this.dialog.open(FormCompanyComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data: any) => {
        console.log("Dialog output:", data)
        if (data.save) {
          // this.loading = true;
          // this.handleSubmit(data.values, data.operationAlert);
        }
      }
    );
  }

  async getCompanies() {
    try {
      this.companies = await this.companyService.getCompanies();
      this.companiesAll = this.companies;
      this.dataCompanies = new MatTableDataSource(this.companies);
      this.dataCompanies.sort = this.sort;
      this.handleUniqueCountries(this.companies);
      this.dataCompanies.paginator = this.paginator;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      console.error('Error en getAlerts = ', error);
    }
  }

  handleUniqueCountries(dataCompanies: Company[]) {
    const countries: string[] = [];
    dataCompanies.forEach((item) => {
      if (countries.findIndex(element => element === item.idCountry) < 0) {
        countries.push(item.idCountry);
      }
    });
    console.log('countries == ', countries);
    this.countriesOptions = countries;
    this.countriesAllOptions = countries;
  };

  changeFilter($event: any, value: string = '') {
    let valueFilter = value;
    if (value === '') {
      valueFilter = $event.target.value;
    }
    const dataFilter = this.companiesAll.filter(company => this._normalizeValue(company.idCountry).includes(valueFilter));
    this.dataCompanies = new MatTableDataSource(dataFilter);
    this.dataCompanies.sort = this.sort;
    this.dataCompanies.paginator = this.paginator;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
