/*
*/
import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { YearStep } from '../components/pages/YearStep';
import type { Action } from '../actions';

describe('Component: YearStep', () => {

  const minProps = {
    countryCode: "AO",
    countryName: "Angola",
    selectedYears: null,
    stepIndex: 1,
    years: [{SurveyYear: 2006}, {SurveyYear: 2011}],
    showPreviousStep: (stepIndex: number) => {},
    yearSelected: (year: number) => {},
  }

  it('renders without exploding', () => {
    expect(
      shallow(
        <YearStep {...minProps} />
      ).length
    ).toEqual(1)
  });

  it('Check the length of the Year list', () => {
    const wrapper = shallow(<YearStep {...minProps} />)
    expect(
      wrapper.find('ListButton').length
    ).toEqual(2);
  })

  it('renders a ListButton with label: Years', () => {
    const wrapper = shallow(<YearStep {...minProps} />)
    expect(
      wrapper.find('ListButton').at(0).prop('label')
    ).toEqual(2006);

    expect(
      wrapper.find('ListButton').at(1).prop('label')
    ).toEqual(2011);
  });



});
