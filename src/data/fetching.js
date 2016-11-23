//@flow

const basicAuth = `Basic ${btoa('admin:district')}`;
const dhis_url = 'https://play.dhis2.org/test/api/dataValueSets?orgUnitIdScheme=name'
const example_json = {
  "dataValues": [
    {
      "dataElement": "LACKdata123",
      "period": "201611",
      "orgUnit": "Country",
      "lastUpdated": "2016-11-11T00:14:11.595",
      "id": "LACKdata123",
      "href": "https://play.dhis2.org/test/api/dataElements/LACKdata123",
      "created": "2016-11-11T00:14:11.595",
      "name": "LACKdata",
      "shortName": "LACK",
      "aggregationType": "SUM",
      "domainType": "AGGREGATE",
      "displayName": "LACKdata123",
      "displayShortName": "LACKdata123",
      "externalAccess": false,
      "valueType": "NUMBER",
      "dimensionItem": "LACKdata123",
      "displayFormName": "LACKdata123",
      "zeroIsSignificant": false,
      "optionSetValue": false,
      "dimensionItemType": "DATA_ELEMENT",
      "access": {
        "read": true,
        "update": true,
        "externalize": false,
        "delete": true,
        "write": true,
        "manage": true
      },
      "categoryCombo": {
        "id": "p0KPaWEg3cf"
      },
      "user": {
        "id": "GOLswS44mh8"
      },
      "dataSetElements": [
        {
          "id": "DJnMQXYzPoL"
        }
      ],
      "translations": [],
      "userGroupAccesses": [],
      "dataElementGroups": [],
      "attributeValues": [],
      "aggregationLevels": [],
      "value": "13",

    },
    {
      "dataElement": "LACKdata123",
      "period": "201611",
      "orgUnit": "Country",
      "lastUpdated": "2016-11-11T00:14:11.595",
      "id": "LACKdata123",
      "href": "https://play.dhis2.org/test/api/dataElements/LACKdata123",
      "created": "2016-11-11T00:14:11.595",
      "name": "LACKdata",
      "shortName": "LACK",
      "aggregationType": "SUM",
      "domainType": "AGGREGATE",
      "displayName": "LACKdata123",
      "displayShortName": "LACKdata123",
      "externalAccess": false,
      "valueType": "NUMBER",
      "dimensionItem": "LACKdata123",
      "displayFormName": "LACKdata123",
      "zeroIsSignificant": false,
      "optionSetValue": false,
      "dimensionItemType": "DATA_ELEMENT",
      "access": {
        "read": true,
        "update": true,
        "externalize": false,
        "delete": true,
        "write": true,
        "manage": true
      },
      "categoryCombo": {
        "id": "p0KPaWEg3cf"
      },
      "user": {
        "id": "GOLswS44mh8"
      },
      "dataSetElements": [
        {
          "id": "DJnMQXYzPoL"
        }
      ],
      "translations": [],
      "userGroupAccesses": [],
      "dataElementGroups": [],
      "attributeValues": [],
      "aggregationLevels": [],
      "value": "12",
    }
  ]
}

export function saveMetaData() {
  return fetch(dhis_url,  {
            method: 'POST',
            headers: {
                  Authorization: basicAuth,
                  'Content-Type': 'application/json',
            },
            body: JSON.stringify(example_json)
        })
        .then(response => response.json())
        .catch(error => console.error(error))
}



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
  return (fetch('http://api.dhsprogram.com/rest/dhs/indicators.json?returnFields=Label,IndicatorId,Level1,SDRID,Definition')
          .then(response => response.json())
          .then(json => json.Data.map(indicator => indicator)))
}

//source: http://stackoverflow.com/questions/40677764/how-to-fetch-data-over-multiple-pages
function getTotalPages(url: string) {
  return (fetch(url).then(response => response.json()).then(json => json.TotalPages))
}

export function* fetchMetaData(countryCode: string, surveyYears: string): Generator<*,*,*> {
  const baseUrl = 'http://api.dhsprogram.com/rest/dhs/data/'
  const url = baseUrl + countryCode + ',' + surveyYears + '?returnFields=CharacteristicLabel,DataId,Indicator,IndicatorId,Value,SurveyId'
  const totalPages = yield getTotalPages(url)
  const apiPromises = []
  if (totalPages) {
    for (let i = 1; i <= totalPages; i++) {
      yield (fetch(url + '&page=' + i)
      .then(response => response.json())
      .then(json => json.Data.map(data => apiPromises.push(data))))
    }
  }
  return apiPromises
}
