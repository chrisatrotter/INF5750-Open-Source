import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { YearStep } from '../src/components/pages/YearStep';

function setup() {
  const props = {
    countryCode: "AO",
    countryName: "Angola",
    selectedYears: [null],
    stepIndex: 2,
    years: [
      {
        SurveyYear: 2006
      },
      {
        SurveyYear: 2011
      }
    ],
    showPreviousStep: (stepIndex: number) => {},
    yearSelected: (year: number) => {},
  }

  const wrapper = shallow(<YearStep {...props} />)

  return {
    props,
    wrapper
  }
}

describe('Component: YearStep', () => {
  const { wrapper } = setup()

  it('Renders without exploding', () => {
    expect(
      wrapper.length
    ).toEqual(1)
  })

  it('Check the length of the Year list', () => {
    expect(
      wrapper.find('ListButton').length
    ).toEqual(3)
  })

  it('Renders a ListButton with label: Years', () => {
    expect(
      wrapper.find('ListButton').at(0).prop('label')
    ).toEqual(2006)
    expect(
      wrapper.find('ListButton').at(1).prop('label')
    ).toEqual(2011)
  });
})
