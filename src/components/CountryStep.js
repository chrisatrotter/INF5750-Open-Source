//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { List, ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { StepTabs } from './common'

class CountryStep extends Component {
  props: {
    countries: Array<String>,
    fetchCountries: () => void,
    stepIndex: number,
  }
  state: {
    input: string
  }
  constructor() {
    super();
    this.state = {
      input: ''
    };
    this.getUserInput = this.getUserInput.bind(this);
  }

  componentWillMount() {
    this.props.fetchCountries()
  }
  getUserInput(event) {
    this.setState({ input: event.target.value })
  }
  getCountries(countries: Array<String>, input: string) {
    return countries.filter(country => country.toLowerCase()
                                              .startsWith(input.toLowerCase()))
                    .map(country => (<ListItem style={{display: 'flex', justifyContent: 'center'}} key={country} primaryText={country} />));
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
          onChange={this.getUserInput}
        />
        <List >
          { this.getCountries(this.props.countries, this.state.input) }
        </List>
        <div style={{display:'flex', justifyContent: 'center'}}>
        <FlatButton
          label="Back"
          style={{marginRight: 12}}
        />
        <RaisedButton
          label="Next"
          primary={true}
        />
        </div>
      </div>
    );
  }
}

const ConnectedPage = connect(
  (state) => ({
    stepIndex: state.stepper.stepIndex,
    countries: state.fetching.countries,
  }),
  (dispatch) => ({
    fetchCountries: () => dispatch({ type: 'COUNTRY_FETCH_REQUESTED' }),
  }),
)(CountryStep);

export default ConnectedPage;
