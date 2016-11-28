//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { List } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Loading from '../layout/Loading';
import ListButton from '../layout/ListButton';

export type Country = {
  CountryName: String,
  DHS_CountryCode: String,
}

export class CountryStep extends Component {
  props: {
    countries: Array<Country>,
    selectedCountry: string,
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

  componentWillMount() {
    this.props.fetchCountries()
  }

  getUserInput(event) {
    this.setState({ input: event.target.value })
  }

  flatButton(country: Country) {
    return <ListButton key={country.DHS_CountryCode}
                       label={country.CountryName}
                       onClick={() => this.props.countrySelected(country.CountryName.toString(),
                                                                 country.DHS_CountryCode.toString(),
                                                                 this.props.stepIndex)} />
  }

  getCountries(countries: Array<Country>, input: string) {
    return countries.filter(country => country.CountryName.toLowerCase().startsWith(this.state.input.toLowerCase()))
                    .map(country => this.flatButton(country));
  }

  isDataLoaded() {
    return this.props.countries;
  }

  loading() {
    return <Loading />
  }

  countryPage() {
    return <div>
            <div style={{display: 'flex', justifyContent: 'center', fontFamily: 'sans-serif'}}>
            </div>
            <TextField
              hintText="Country"
              fullWidth={true}
              value={this.state.input}
              onChange={(event) => this.getUserInput(event)}
            />

            <List>
              { this.getCountries(this.props.countries, this.state.input)}
            </List>
          </div>
  }

  render()  {
    return (this.props.countries ? this.countryPage() : this.loading())
  }
}

const ConnectedPage = connect(
  (state) => ({
    countries: state.fetching.countries,
    selectedCountry: state.survey.countryName,
    stepIndex: state.routing.stepIndex,
  }),
  (dispatch) => ({
    countrySelected: (countryName: string, countryCode: string, stepIndex: number) => {
      dispatch({ type: 'COUNTRY_SELECTED', countryName: countryName, countryCode: countryCode })
      dispatch({ type: 'YEAR_FETCH_REQUESTED', countryCode: countryCode })
      dispatch({ type: 'PAGE_REQUESTED', name: 'SelectSurveys', stepIndex: stepIndex })
    },
    fetchCountries: () => dispatch({ type: 'COUNTRY_FETCH_REQUESTED' }),
  }),
)(CountryStep);

export default ConnectedPage;
