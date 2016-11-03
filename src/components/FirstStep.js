//@flow
import React from 'react';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';

class FirstStep extends React.Component {
  state: {
    input: string,
    countries: array,
  }
  constructor() {
    super();
    this.state = {
      input: "",
      countries: []
    };
    this.fetchCountries().then(response => this.listCountries(response.Data));
    this.getUserInput = this.getUserInput.bind(this);
  }

  getUserInput(event) {
    this.setState({input: event.target.value});
  }

  onChange(event) {
    this.setState({input: event.target.value});
  }

  getCountries(countries, input) {
    return countries.filter(country => country.toLowerCase()
                                              .startsWith(input.toLowerCase()))
                    .map(country => (<ListItem primaryText={country} />));
  }

  async fetchCountries() {
    return (fetch('http://api.dhsprogram.com/rest/dhs/countries.json?returnFields=CountryName,DHS_CountryCode')
             .then(response => response.json()))
  }

  listCountries(data) {
    this.setState({countries:data.map(country => country.CountryName)});
  }

  render()  {
    return (
      <div>
        <p> First Step </p>

        <TextField
          hintText="Country"
          fullWidth={true}
          value={this.state.input}
          onChange={this.getUserInput.bind(this)}
        />

        <List>
          {this.getCountries(this.state.countries, this.state.input)}
        </List>
      </div>
    );
  }
}

module.exports = FirstStep;
