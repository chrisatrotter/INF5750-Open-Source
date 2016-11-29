//@flow
export type DataElements = {
  dataElements: Array<DataElement>
}

type DataElement = {
  aggregationType: string,
  categoryCombo: { id: string },
  code: string,
  domainType: string,
  name: string,
  shortName: string,
  valueType: string,
}

export type Countries = {
  countries: Array<Country>
}

export type Country = {
  CountryName: string,
  DHS_CountryCode: string,
}

export type Indicator = {
  Level1: string,
  IndicatorId: string,
  Definition: string,
  Label: string,
  ShortName: string,
  MeasurementType: string,
}

export type ImportData = {
  dataValues: Array<ImportElement>
}

type ImportElement = {
  comment: string,
  dataElement: string,
  orgUnit: string,
  period: string,
  value: number,
}

export type PageName = 'SelectCountry'
                     | 'SelectSurveys'
                     | 'SelectData'
 

export type OrgUnit = {
  organisationUnits: Array<OrgUnitElement>
}

type OrgUnitElement = {
  code: string,
  displayName: string,
  name: string,
  openingDate: string,
  parent: { id: string },
  shortName: string,
}

export type SubCategory = {
  DataId: number,
  Definition: string,
  IndicatorId: string,
  Label: string,
  MeasurementType: string,
  ShortName: string,
  SurveyId: string,
  Value: number,
}

export type Year = {
  SurveyYear: number
}
