//@flow

export function fetchCountries() {
  return (fetch('http://api.dhsprogram.com/rest/dhs/countries.json?returnFields=CountryName,DHS_CountryCode')
           .then(response => response.json())
           .then(json => json.Data.map(country => country.CountryName)))
}

export function fetchMetaData() {
  return (fetch('http://api.dhsprogram.com/rest/dhs/data/2010,AM')
        .then(response => response.json())
        .then(json => json.Data.map(survey => survey.Indicator)))
}
export function fetchYear() {
  return (fetch('http://api.dhsprogram.com/rest/dhs/surveys/')
          .then(response => response.json())
          .then(json => json.Data.map(survey => survey)))
}
