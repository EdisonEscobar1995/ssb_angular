import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Company } from 'src/app/entities/company';
import { CompanyService } from 'src/app/services/company/company.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-list-companies',
  templateUrl: './list-companies.component.html',
  styleUrls: ['./list-companies.component.scss']
})
export class ListCompaniesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'description', 'idCountry', 'param', 'actions'];
  companies: Company[] | [] = [];
  dataCompanies: any;
  loading = true;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly serviceMenu: MenuService,
    private readonly companyService: CompanyService,
    private readonly _liveAnnouncer: LiveAnnouncer,
  ) {
  }

  ngOnInit(): void {
    this.serviceMenu.getMenuActive().next('companies');
    this.getCompanies();
  }

  ngOnDestroy() {
    // this.serviceMenu.getMenuActive().unsubscribe();
  }

  async getCompanies() {
    try {
      this.companies = await this.companyService.getCompanies();
      this.dataCompanies = new MatTableDataSource(this.companies);
      this.dataCompanies.sort = this.sort;
      this.dataCompanies.paginator = this.paginator;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      console.error('Error en getAlerts = ', error);
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
