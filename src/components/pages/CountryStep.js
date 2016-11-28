//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { List } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Loading from '../layout/Loading';
import ListButton from '../layout/ListButton';
import { generateJSONCountries } from '../../data/posting'

import type { Country, OrgUnit } from '../../types'

export class CountryStep extends Component {
  props: {
    countries: Array<Country>,
    selectedCountry: string,
    postCountriesAsOrgUnits: (countries: OrgUnit) => void,
    fetchCountries: () => void,
    countrySelected: (countryName: string, countryCode: string) => void,
    stepIndex: number,
  }

  state: {
    input: string,
  }

  constructor() {
    super();
    this.state = {
      input: ''
    };
  }

  getUserInput(event: any) {
    this.setState({ input: event.target.value })
  }

  getCountries(countries: Array<Country>, input: string) {
    return countries.filter(country => country.CountryName.toLowerCase().startsWith(this.state.input.toLowerCase()))
                    .map(country =>
                      <ListButton key={country.DHS_CountryCode}
                                  label={country.CountryName}
                                  onClick={() =>
                                    this.props.countrySelected(country.CountryName.toString(),
                                                                       country.DHS_CountryCode.toString(),
                                                                       this.props.stepIndex)} />);
  }

  render()  {
    if (this.props.countries.length === 0) {
      return <Loading />
    }
    this.props.postCountriesAsOrgUnits(generateJSONCountries(this.props.countries))
    return <div>
            <div style={{display: 'flex', justifyContent: 'center', fontFamily: 'sans-serif'}}>
            </div>
            <TextField
              hintText="Search country"
              fullWidth={true}
              value={this.state.input}
              onChange={(event) => this.getUserInput(event)}
            />

            <List>
              { this.getCountries(this.props.countries, this.state.input)}
            </List>
          </div>
  }
}

const mapStateToProps = (state) => ({
  countries: state.fetching.countries,
  selectedCountry: state.survey.countryName,
  stepIndex: state.routing.stepIndex
})

const mapDispatchToProps = (dispatch) => ({
  countrySelected: (countryName: string, countryCode: string, stepIndex: number) => {
    dispatch({ type: 'COUNTRY_SELECTED', countryName: countryName, countryCode: countryCode })
    dispatch({ type: 'YEAR_FETCH_REQUESTED', countryCode: countryCode })
    dispatch({ type: 'PAGE_REQUESTED', name: 'SelectSurveys', stepIndex: stepIndex })
  },
  fetchCountries: () => dispatch({ type: 'COUNTRY_FETCH_REQUESTED' }),
  postCountriesAsOrgUnits: (countries: OrgUnit) => dispatch({ type: 'POST_COUNTRIES_REQUESTED', countries: countries })
})

const ConnectedPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(CountryStep);

export default ConnectedPage;
