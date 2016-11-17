import React, { Component } from "react";
import { connect } from 'react-redux';
import Header from "./../layout/Header";
import DisplayPage from './DisplayPage';

class Layout extends Component {
  props: {
    fetchCountries: () => void,
    fetchIndicator: () => void,
  }
  componentWillMount() {
    this.props.fetchCountries()
    this.props.fetchIndicator()
  }
  render() {
    return (
      <div>
        <Header />
        <DisplayPage />
      </div>
    )
  }
}

const ConnectedPage = connect(
  () => ({}),
  (dispatch) => ({
    fetchCountries: () => dispatch({ type: 'COUNTRY_FETCH_REQUESTED' }),
    fetchIndicator: () => dispatch({ type: 'INDICATOR_FETCH_REQUESTED'}),
   }),
)(Layout);

export default ConnectedPage;
