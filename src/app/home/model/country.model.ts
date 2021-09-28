export interface CountryModel {
    name: string;
    full_name: string;
    capital: string;
    iso2: string;
    iso3: string;
    covid19: {
        total_case: string,
        total_deaths: string,
        last_updated: string
    },
    currentPresident: {
        name: string,
        gender: string,
        appointmentDtartDate: string,
        appointmentEndDate: null,
    },
    currency: string,
    phone_code: string,
    continent: string,
    description: string,
    size: string,
    independence_date: string,
    population: string;
    href: {
        self: string;
        states: string;
        presidents: string;
        flag: string;
    }
  }
  