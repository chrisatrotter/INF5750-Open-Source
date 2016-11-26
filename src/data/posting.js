//@flow
import type { Country } from '../components/pages/CountryStep'
import { find } from 'lodash'

const basicAuth = `Basic ${btoa('admin:district')}`;
const endpoint = 'https://play.dhis2.org/test'
const localhost = 'http://192.168.0.102:8082'
const existingOrgUnitWorldId = 'giKHD1cg3DQ'
const metadataField = '/api/metadata?strategy=CREATE_AND_UPDATE'


export function postCountriesAsOrgUnits(orgUnitCountries: any) {
  return fetch(endpoint + metadataField, {
    method: 'POST',
    headers: {
      Authorization: basicAuth,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orgUnitCountries)
  })
  .then(response => response.json())
  .catch(error => console.error(error))
}


export function generateJSONCountries(countries: Array<Country>) {
  const jsonCountry = {
    "organisationUnits": []
  }

  countries.map(country => {
    const orgUnitElement = {
      "name": country.CountryName,
      "code": country.DHS_CountryCode,
      "shortName": country.DHS_CountryCode,
      "displayName": country.CountryName,
      "openingDate": new Date().toISOString(),
      "parent": {
        "id": existingOrgUnitWorldId,
      }
    }
    jsonCountry.organisationUnits.push(orgUnitElement)
  })
  return jsonCountry
}

export function* postMetaData(dataElements: any, importData: any): Generator<*,*,*>  {
  yield fetch(endpoint + metadataField,  {
            method: 'POST',
            headers: {
                  Authorization: basicAuth,
                  'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataElements)
        })
        .then(response => response.json())
        .catch(error => console.error(error))

  return fetch(endpoint + '/api/dataValueSets?dataElementIdScheme=name&orgUnitIdScheme=name',  {
            method: 'POST',
            headers: {
                  Authorization: basicAuth,
                  'Content-Type': 'application/json',
            },
            body: JSON.stringify(importData)
        })
        .then(response => response.json())
        .catch(error => console.error(error))
}

//https://play.dhis2.org/test/api/categoryCombos/p0KPaWEg3cf.json
const defaultCategoryCombos = 'p0KPaWEg3cf'

export function generateJSONDataElements(subCategory: Array<Object>, dataSelected: Array<number>) {
  const jsonDataValues = {
    "dataElements": []
  }
  dataSelected.map(dataId => {
    const matchedDataObject = find(subCategory, subData => subData.DataId === dataId)
    const jsonDataElement = {
      "name": matchedDataObject.Label,
      "shortName": matchedDataObject.IndicatorId,
      "code": matchedDataObject.IndicatorId,
      "valueType": convertValueType(matchedDataObject.MeasurementType.toUpperCase()),
      "definition": matchedDataObject.Definition,
      "domainType": "AGGREGATE",
      "aggregationType": "SUM",
      "categoryCombo": {
        "id": defaultCategoryCombos
      },
    }
    jsonDataValues.dataElements.push(jsonDataElement)
  })
  return jsonDataValues
}

function convertValueType(measurementType: string) {
  switch(measurementType) {
    case "PERCNT":
      return "PERCENTAGE"
    case "RATES":
      return "NUMBER"
    case "MEANN":
      return "NUMBER"
    case "MEDAIN":
      return "NUMBER"
    default:
      return "NUMBER"
  }
}

export function generateJSONImportData(countryName: string, subCategory: Array<Object>, dataSelected: Array<number>) {
  const date = new Date()
  const today = date.getFullYear().toString() + date.getMonth().toString()
  const jsonDataValues = {
    "dataValues": []
  }
  dataSelected.map(dataId => {
    const matchedDataObject = find(subCategory, subData => subData.DataId === dataId)
    const jsonDataElement = {
      "dataElement": matchedDataObject.Label,
      "period": today,
      "orgUnit": countryName,
      "value": matchedDataObject.Value,
    }
    jsonDataValues.dataValues.push(jsonDataElement)
  })
  return jsonDataValues
}
