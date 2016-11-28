import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { VariableStep } from '../components/pages/VariableStep';

function setup() {

  const props = {
    countryName: "Albania",
    dataCategory: "Adult Health",
    dataSelected: [137027, 136992],
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
    selectData: (dataId: number) => {},
    deselectData: (dataId: number) => {},
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

  it('Renders a TextField with hintText: ', () => {
    expect(
      wrapper.find('TextField').prop('hintText')
    ).toEqual('Select data of ' + props.dataCategory + ' from ' + props.countryName + ' - ' + props.year)
  });

  it('Renders list item with correct informations', () => {
    expect(
      wrapper.find('ListItem').at(0).prop('primaryText')
    ).toEqual('Privately purchased commercial insurance')
    expect(
      wrapper.find('ListItem').at(1).prop('primaryText')
    ).toEqual('Other health insurance')
  });
})
