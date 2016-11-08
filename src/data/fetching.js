export function fetchCountries() {
  return (fetch('http://api.dhsprogram.com/rest/dhs/countries.json?returnFields=CountryName,DHS_CountryCode')
           .then(response => response.json())
           .then(json => json.Data.map(country => country.CountryName)))
}
