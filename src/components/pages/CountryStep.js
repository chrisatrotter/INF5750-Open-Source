//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { List } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

export type Country = {
  CountryName: String,
  DHS_CountryCode: String,
}

class CountryStep extends Component {
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
  getUserInput(event) {
    this.setState({ input: event.target.value })
  }

  getCountries(countries: Array<Country>, input: string) {
    return countries.filter(country => country.CountryName.toLowerCase()
                                              .startsWith(this.state.input.toLowerCase()))
                    .map(country => (
                      <FlatButton style={{ display: 'flex', justifyContent: 'center', width: '100%'}}
                                  key={country.DHS_CountryCode}
                                  hoverColor={'#B5D66B'}
                                  label={country.CountryName}
                                  labelStyle={{textTransform: 'capitalize'}}
                                  onClick={() => this.props.countrySelected(country.CountryName.toString(), country.DHS_CountryCode.toString(), this.props.stepIndex)}/>));
  }
  render()  {
    if (!this.props.countries) {
      return (<div style={{display: 'flex', justifyContent: 'center'}}><CircularProgress size={60} thickness={5} /></div>)
    }
    return (
      <div>
        <div>
        <p>Choose country:</p>
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
    );
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
