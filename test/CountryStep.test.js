//@flow
import 'babel-polyfill'
import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import { CountryStep } from '../src/components/pages/CountryStep'

function setup() {
  const props = {
    countries: [
      {
        CountryName: "Albania",
        DHS_CountryCode: "AL"
      },
      {
        CountryName: "Bangladesh",
        DHS_CountryCode: "BD"
      }
    ],
    selectedCountry: "",
    postCountriesAsOrgUnits: () => {},
    fetchCountries: () => {},
    countrySelected: () => {},
    stepIndex: 1,
  }

  const wrapper = shallow(<CountryStep {...props} />)

  return {
    props,
    wrapper
  }
}

describe('Component: CountryStep', () => {
  const { wrapper } = setup()

  it('Renders without exploding', () => {
    expect(
      wrapper.length
    ).toEqual(1)
  })

  it('Renders a TextField with hintText: Search country', () => {
    expect(
      wrapper.find('TextField').prop('hintText')
    ).toEqual('Search country')
  })

  it('Renders a ListButton with Albania and Bangladesh', () => {
    expect(
      wrapper.find('ListButton').at(0).prop('label')
    ).toEqual('Albania')
    expect(
      wrapper.find('ListButton').at(1).prop('label')
    ).toEqual('Bangladesh')
  })

  it('Setting state from TextField', () => {
    wrapper.setState({ input: 'Albania' })
    expect(
      wrapper.find('TextField').props().value
    ).toEqual('Albania')
  })
})
