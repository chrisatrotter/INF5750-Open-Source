//@flow
import type { Country, DataElements, ImportData, OrgUnit } from '../types'
import { find } from 'lodash'

const userpassword = new Buffer('admin:district').toString('base64') 
const basicAuth = `Basic ${userpassword}`
const endpoint = 'https://play.dhis2.org/test'
//const localhost = 'http://193.157.250.13:8082'
const existingOrgUnitWorldId = 'giKHD1cg3DQ'
//const localhostOrgUnitId = 'p73Pb84RyR8'
const metadataField = '/api/metadata?importStrategy=CREATE_AND_UPDATE'
const dataValueSet = '/api/dataValueSets?dataElementIdScheme=name&orgUnitIdScheme=name&dryRun=true&importStrategy=CREATE_AND_UPDATE'
//https://play.dhis2.org/test/api/categoryCombos/p0KPaWEg3cf.json
const defaultCategoryCombos = 'p0KPaWEg3cf'

export function postCountriesAsOrgUnits(orgUnitCountries: OrgUnit) {
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

export function* postMetaData(data: DataElements, importData: ImportData): Generator<*,*,*>  {
  yield fetch(endpoint + metadataField,  {
            method: 'POST',
            headers: {
                  Authorization: basicAuth,
                  'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .catch(error => console.error(error))

  return yield fetch(endpoint + dataValueSet,  {
            method: 'POST',
            headers: {
                  Authorization: basicAuth,
                  'Content-Type': 'application/json',
            },
            body: JSON.stringify(importData)
        })
        .then(response => response.json())
        .then(json => json.importCount)
        .catch(error => console.error(error))
}

export function generateJSONCountries(countries: Array<Country>) {
  const jsonCountry = {
    "organisationUnits": []
  }

  countries.forEach(country => {
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

export function generateJSONDataElements(subCategory: Array<Object>, dataSelected: Array<number>) {
  const jsonDataValues = {
    "dataElements": []
  }
  dataSelected.forEach(dataId => {
    const matchedDataObject = find(subCategory, subData => subData.DataId === dataId)
    const jsonDataElement = {
      "name": matchedDataObject.Label,
      "shortName": matchedDataObject.IndicatorId,
      "code": matchedDataObject.IndicatorId,
      "valueType": convertValueType(matchedDataObject.MeasurementType.toUpperCase()),
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

export function generateJSONImportData(countryName: string, subCategory: Array<Object>, dataSelected: Array<number>) {
  const date = new Date()
  const today = date.getFullYear().toString() + date.getMonth().toString()
  const jsonDataValues = {
    "dataValues": []
  }
  dataSelected.forEach(dataId => {
    const matchedDataObject = find(subCategory, subData => subData.DataId === dataId)
    const jsonDataElement = {
      "dataElement": matchedDataObject.Label,
      "period": today,
      "orgUnit": countryName,
      "value": matchedDataObject.Value,
      "comment": matchedDataObject.Definition,
    }
    jsonDataValues.dataValues.push(jsonDataElement)
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
