//@flow
import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import { CountryStep } from '../components/pages/CountryStep'

describe('Component: CountryStep', () => {

    const minProps = {
      countries: [{CountryName: "Albania", DHS_CountryCode: "AL"}, {CountryName: "Bangladesh", DHS_CountryCode: "BD"}],
      selectedCountry: "",
      fetchCountries: () => {},
      countrySelected: () => {},
      stepIndex: 1,
    }

    it('renders without exploding', () => {
      expect(
        shallow(
          <CountryStep {...minProps} />
        ).length
      ).toEqual(1)
    })


    it('renders a TextField with hintText: Country', () => {
      const wrapper = shallow(<CountryStep {...minProps} />)
      expect(
        wrapper.find('TextField').prop('hintText')
      ).toEqual('Country')
    });

    it('renders a ListButton with Albania and Bangladesh', () => {
      const wrapper = shallow(<CountryStep {...minProps} />)
      expect(
        wrapper.find('ListButton').at(0).prop('label')
      ).toEqual('Albania')
      expect(
        wrapper.find('ListButton').at(1).prop('label')
      ).toEqual('Bangladesh')
    });

    it('should correctly render TextField', () => {
      const wrapper = shallow(<CountryStep {...minProps} />)
      wrapper.setState({ input: 'Albania' })
      expect(
        wrapper.find('TextField').props().value
      ).toEqual('Albania')
    })

});
