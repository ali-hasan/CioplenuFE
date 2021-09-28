import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CountryModel } from '../model/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor(private http: HttpClient) {}

  getCountries() {
    return this.http
      .get('countries')
      .pipe(map((response: any) => response.data || [] ));
  }

  getCountry(countryName: string | null) {
    return this.http
      .get(`countries/${countryName}`)
      .pipe(map((response: any) => response.data || {} ));
  }
}
