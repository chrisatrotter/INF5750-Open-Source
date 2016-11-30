import 'babel-polyfill'
import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import { VariableStep } from '../src/components/pages/VariableStep'
import type { DataElements, ImportData } from '../src/types'

function setup() {
  const props = {
    countryName: "Albania",
    countryCode: "AL",
    dataCategory: "Adult Health",
    dataSelected: [137027, 136992],
    importResponse: null,
    stepIndex: 2,
    subCategory: [
      {
        DataId: 137027,
        Definition: "Percentage of women with privately purchased commercial insurance",
        IndicatorId: "AH_HINS_W_PRV",
        Label: "Privately purchased commercial insurance",
        SurveyId: "AL2008DHS",
        Value: 2.2,
      },
      {
        DataId: 136992,
        Definition: "Percentage of women with other health insurance",
        IndicatorId: "AH_HINS_W_OTH",
        Label: "Other health insurance",
        SurveyId: "AL2008DHS",
        Value: 19.7,
      }
    ],
    year: 2008,
    deselectData: (dataId: number) => {},
    receiptConfirmed: () => {},
    submitData: (dataElements: DataElements, importData: ImportData) => {},
    selectData: (dataId: number) => {},
    showPreviousStep: (stepIndex: number) => {},
  }

  const wrapper = shallow(<VariableStep {...props} />)

  return {
    props,
    wrapper
  }
}

describe('Component: VariableStep', () => {
  const { wrapper, props } = setup()

  it('Renders without exploding', () => {
    expect(
      wrapper.length
    ).toEqual(1)
  })

  it('Renders a TextField with hintText: Search data of Adult Health from Albania - 2008', () => {
    expect(
      wrapper.find('TextField').prop('hintText')
    ).toEqual('Search data of ' + props.dataCategory + ' from ' + props.countryName + ' - ' + props.year)
  })

  it('Renders list item with correct informations', () => {
    expect(
      wrapper.find('ListItem').at(0).prop('primaryText')
    ).toEqual('Privately purchased commercial insurance')
    expect(
      wrapper.find('ListItem').at(1).prop('primaryText')
    ).toEqual('Other health insurance')
  })
})
