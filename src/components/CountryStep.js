//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { List } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { StepTabs } from './common'

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
    showNextStep: (stepIndex: number) => void,
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
  getCountries(countries: Array<Country>, input: string) {
    return countries.filter(country => country.CountryName.toLowerCase()
                                              .startsWith(this.state.input.toLowerCase()))
                    .map(country => (
                      <FlatButton style={{ display: 'flex', justifyContent: 'center', width: '100%'}}
                                  key={country.DHS_CountryCode}
                                  backgroundColor={(this.props.selectedCountry &&
                                                    this.props.selectedCountry === country.CountryName.toString()) ?
                                                    '#B5D66B' : '#FFFFFF'}
                                  onClick={() => this.props.countrySelected(country.CountryName.toString(), country.DHS_CountryCode.toString())}
                                  labelStyle={{textTransform: 'capitalize'}}
                                  label={country.CountryName} />));
  }
  render()  {
    if (!this.props.countries) {
      return (<div> <p>Loading...</p> </div>)
    }
    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <StepTabs stepIndex={this.props.stepIndex}/>
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
        <div style={{display:'flex', justifyContent: 'center'}}>
        <FlatButton
          label="Back"
          style={{marginRight: 12}}
        />
        <RaisedButton
          label="Next"
          primary={true}
          onClick={ () => this.props.showNextStep(this.props.stepIndex) }
        />
        </div>
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
    countrySelected: (countryName: string, countryCode: string) => dispatch({ type: 'COUNTRY_SELECTED', countryName: countryName, countryCode: countryCode }),
    fetchCountries: () => dispatch({ type: 'COUNTRY_FETCH_REQUESTED' }),
    showNextStep: (stepIndex: number) => dispatch({ type: 'PAGE_REQUESTED', name: 'SelectSurveys', stepIndex: stepIndex })
  }),
)(CountryStep);

export default ConnectedPage;
