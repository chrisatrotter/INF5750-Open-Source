import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { CategoryStep } from '../src/components/pages/CategoryStep';

function setup() {
  const props = {
    countries: [{CountryName: "Angola", DHS_CountryCode: "AO"}],
    countryCode: "AO",
    countryName: "Angola",
    indicators: [
      {
        Definition: "Number of women age 15-49 (unweighted)",
        IndicatorId: "FE_FRTY_W_UPG",
        Label: "Number of women age 15-49 (unweighted)",
        Level1: "Fertility",
        MeasurementType: "Number",
        ShortName: "Number of women age 15-49 (unweighted)"
      },
      {
        Definition: "Percentage of children under age five with fever in the two weeks preceding the survey that received any anti-malarial drugs who took Quinine",
        IndicatorId: "ML_AMLD_C_QNN",
        Label: "Children who took Quinine",
        Level1: "Malaria",
        MeasurementType: "Percent",
        ShortName: "Quinine"
      }
    ],
    indicatorMap: {
      FE_FRTY_W_UPG: {
        Definition: "Number of women age 15-49 (unweighted)",
        Level1: "Fertility",
        MeasurementType: "Number",
        ShortName: "Number of women age 15-49 (unweighted)"
      },
      ML_AMLD_C_QNN: {
        Definition: "Percentage of children under age five with fever in the two weeks preceding the survey that received any anti-malarial drugs who took Quinine",
        Level1: "Malaria",
        MeasurementType: "Percent",
        ShortName: "Quinine"
      }
    },
    stepIndex: 2,
    surveyYears: 2011,
    variables: [
      {
        haracteristicLabel: "Total",
        DataId: 223536,
        Indicator: "Children who took Quinine",
        IndicatorId: "ML_AMLD_C_QNN",
        SurveyId: "AO2011MIS",
        Value: 9.4
      },
      {
        CharacteristicLabel:"Total",
        DataId:315695,
        Indicator: "Number of women age 15-49 (unweighted)",
        IndicatorId: "FE_FRTY_W_UPG",
        SurveyId: "AO2011MIS",
        Value:8589
      }
    ],
    year: 2011,
    categorySelected: (category: any, stepIndex: number) => {},
    showPreviousStep: (stepIndex: number) => {},
  }

  const wrapper = shallow(<CategoryStep {...props} />);

  return {
    props,
    wrapper
  }
}

describe('Component: CategoryStep', () => {
  const { wrapper } = setup();

  it('Renders without exploding', () => {
    expect(
      wrapper.length
    ).toEqual(1)
  });

  it('Render the amount of ListButton for each of the categories: ', () => {
    expect(
      wrapper.find('ListButton').length
    ).toEqual(3);
  });


  it('Render the label of ListButton', () => {
    expect(
      wrapper.find('ListButton').at(0).prop('label')
    ).toEqual('Fertility');
    expect(
      wrapper.find('ListButton').at(1).prop('label')
    ).toEqual('Malaria')
  });
});
