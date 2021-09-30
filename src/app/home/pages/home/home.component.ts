import { Component, OnInit, ChangeDetectionStrategy, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
// import { regionFilterStored, invokeCountriesAPI, filterDataStored } from '../../../../store/country.action';
// import { countriesList } from '../../../../store/countries.selector';
// import { filters } from '../../../../store/selectors/filter.selector';
import { CountryModel } from 'src/app/home/model/country.model';
import { AppState, FilterModel } from 'src/app/store/app.state';
import { countriesList } from 'src/app/store/selectors/countries.selector';
import { filterDataStored, invokeCountriesAPI } from 'src/app/store/actions/country.action';
import { filters } from 'src/app/store/selectors/filter.selector';
import { LoaderService } from 'src/app/core/loader.service';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns = ['name', 'capital', 'continent', 'population', 'size', 'phone_code', 'currency'];

  dataSource!: MatTableDataSource<CountryModel>;
  countries$!: Observable<CountryModel[]>;
  filter$!: Observable<FilterModel>;
  subscription!: Subscription;
  data: CountryModel[] = [];
  filter: FilterModel = {
    nameFilter: '',
    regionFilter: ''
  };

  nameInputModel: string = '';
  regionInputModel: string = '';

  // { country: CountryModel[] }
  constructor(
    private store: Store<AppState>, private route: Router, public loaderService: LoaderService) {
    this.countries$ = this.store.pipe(select(countriesList('')));
    this.filter$ = this.store.pipe(select(filters()))
  }

  ngOnInit(): void {
    this.countries$.subscribe(res => {
      this.data = res;
      this.filter$.subscribe(filter => {
        
        if (filter.regionFilter !== '')
          res = this.data.filter((element: CountryModel) => !!element.continent ? element.continent.toLowerCase().includes(filter.regionFilter) : null);
        if (filter.nameFilter !== '')
          res = this.data.filter((element: CountryModel) => !!element.name ? element.name.toLowerCase().includes(filter.nameFilter) : null);
        
        
        if (filter.nameFilter === '' && filter.regionFilter === '')
          res = this.data;

        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.nameInputModel = filter.nameFilter;
        this.regionInputModel = filter.regionFilter;
      })
    })
    this.store.dispatch(invokeCountriesAPI());
  }

  public filterByName = (value: string) => {
    this.filter = {...this.filter, nameFilter: value};
    this.store.dispatch(filterDataStored({filtermodel: this.filter}));
  }

  public filterByRegion = (value: string) => {
    this.filter = {...this.filter, regionFilter: value};
    this.store.dispatch(filterDataStored({filtermodel: this.filter}));
  }

  onRowClick(row: CountryModel) {
    this.route.navigate([`countries/${row.name}`]);
  }

}
