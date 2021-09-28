import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { invokeSingleCountryAPI } from 'src/app/store/actions/country.action';
import { CountryModel } from '../../model/country.model';
import { AppState } from 'src/app/store/app.state';
import { singleCountry } from 'src/app/store/selectors/country.selector';
import { LoaderService } from 'src/app/core/loader.service';

@Component({
  selector: 'country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  country$!: Observable<CountryModel>;
  country: any = {
    name: '',
    full_name: '',
    capital: '',
    iso2: '',
    iso3: '',
    covid19: {
      total_case: '',
      total_deaths: '',
      last_updated: ''
    },
    currentPresident: {
      name: '',
      gender: '',
      appointmentDtartDate: '',
      appointmentEndDate: null
    },
    currency: '',
    phone_code: '',
    continent: '',
    description: '',
    size: '',
    independence_date: '',
    population: '',
    href: {
      self: '',
      states: '',
      presidents: '',
      flag: ''
    }
  };
  countryName!: string | null;
  
  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router,
      public loaderService: LoaderService) {
    this.country$ = this.store.pipe(select(singleCountry()));
    router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.countryName = this.route.snapshot.paramMap.get("name");
    this.country$.subscribe(res => this.country = res);
    this.store.dispatch(invokeSingleCountryAPI({countryName: this.countryName}));
  }

}
