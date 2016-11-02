import React from 'react';

import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';

class FirstStep extends React.Component {
  state: {
    input: string,
  }
  constructor() {
    super();
    this.state = {
      input: ""
    };
    this.getUserInput = this.getUserInput.bind(this);
  }

  getUserInput(event) {
    this.setState({
      input: event.target.value
    });
  }

  onChange(event) {
    this.setState({input: event.target.value});
  }

  getCountries(countries, input) {
    return countries.filter(country => country.toLowerCase()
                                              .startsWith(input.toLowerCase()))
                    .map(country => (<ListItem primaryText={country} />));
  }

  fetchCountries() {
    return fetch('http://api.dhsprogram.com/rest/dhs/countries.json?returnFields=CountryName,DHS_CountryCode')
             .then(response => response.json())
  }

  render()  {
    var countries = [
      "Afghanistan", "Albania", "Andorra",
      "Belgium", "Belize", "Bermuda",
      "Kenya",
      "Nauru", "Norway",
      "Morocco",
      "Peru",
      "Romania",
      "Swaziland",
      "Vanuatu", "Vatican City",
      "Zimbabwe"];

    return (
      <div>
        {console.log(this.fetchCountries().then(response => console.log(response.Data)))}

        <p> First Step </p>

        <TextField
          hintText="Country"
          fullWidth={true}
          value={this.state.input}
          onChange={this.getUserInput.bind(this)}
        />

        <List>
          {this.getCountries(countries, this.state.input)}
        </List>
      </div>
    );
  }
}

module.exports = FirstStep;
