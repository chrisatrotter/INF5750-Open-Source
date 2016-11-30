/*
@flow
*/
import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { CategoryStep } from '../components/pages/CategoryStep';



describe('Component: CategoryStep', () => {
  const category_Props = {
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

  it('renders without exploding', () => {
    expect(
      shallow(
        <CategoryStep {...category_Props} />
      ).length
    ).toEqual(1)
  });

  /*
  it('render a ListButton with a list of categories: ', () => {
    const wrapper = shallow(<CategoryStep {...category_Props} />);
    expect(
      wrapper.find('FlatButton').length
    ).toEqual(2);
  });*/

});
