//@flow

export function fetchCountries() {
  return (fetch('http://api.dhsprogram.com/rest/dhs/countries.json?returnFields=CountryName,DHS_CountryCode')
           .then(response => response.json())
           .then(json => json.Data.map(country => country)))
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

//source: http://stackoverflow.com/questions/40677764/how-to-fetch-data-over-multiple-pages
function getTotalPages(url: string) {
  return (fetch(url).then(response => response.json()).then(json => json.TotalPages))
}

export function* fetchMetaData(countryCode: string, surveyYears: string): Generator<*,*,*> {
  const baseUrl = 'http://api.dhsprogram.com/rest/dhs/data/'
  const url = baseUrl + countryCode + ',' + surveyYears + '?returnFields=CharacteristicLabel,Indicator,IndicatorId,Value'
  const totalPages = yield getTotalPages(url)
  const apiPromises = []
  if (totalPages) {
    for (let i = 1; i <= totalPages; i++) {
      yield (fetch(url + '&page=' + i)
      .then(response => response.json())
      .then(json => json.Data.map(x => apiPromises.push(x))))
    }
  }
  return apiPromises
}
