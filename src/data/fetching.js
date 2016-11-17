//@flow

export function fetchCountries() {
  return (fetch('http://api.dhsprogram.com/rest/dhs/countries.json?returnFields=CountryName,DHS_CountryCode')
           .then(response => response.json())
           .then(json => json.Data.map(country => country)))
}

export function fetchMetaData() {
  return (fetch('http://api.dhsprogram.com/rest/dhs/data/2010,AM')
        .then(response => response.json())
        .then(json => json.Data.map(survey => survey.Indicator)))
}

export function fetchYear(countryCode: string) {
  return (fetch('http://api.dhsprogram.com/rest/dhs/surveys/' + countryCode + '?returnFields=SurveyYear')
          .then(response => response.json())
          .then(json => json.Data.map(survey => survey)))
}

export function fetchIndicator() {
  return (fetch('http://api.dhsprogram.com/rest/dhs/indicators.json?returnFields=Label,IndicatorId,Level1,SDRID')
          .then(response => response.json())
          .then(json => json.Data.map(indicator => indicator)))
}
