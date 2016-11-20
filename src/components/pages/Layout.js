//@flow
import React, { Component } from "react";
import { connect } from 'react-redux';
import Header from "./../layout/Header";
import DisplayPage from './DisplayPage';
import type { Indicator } from '../../actions'

class Layout extends Component {
  props: {
    indicators: Array<Indicator>,
    fetchCountries: () => void,
    fetchIndicator: () => void,
    storeIndicator: (indicatorMap: Object) => void,
  }
  componentWillMount() {
    this.props.fetchCountries()
    this.props.fetchIndicator()
  }
  render() {
    if (this.props.indicators) {
      const indicatorMap = {}
      this.props.indicators.map(indicator => indicatorMap[indicator.IndicatorId] = indicator.Level1)
      this.props.storeIndicator(indicatorMap)
    }
    return (
      <div>
        <Header />
        <DisplayPage />
      </div>
    )
  }
}

const ConnectedPage = connect(
  (state) => ({
    indicators: state.fetching.indicators
  }),
  (dispatch) => ({
    fetchCountries: () => dispatch({ type: 'COUNTRY_FETCH_REQUESTED' }),
    fetchIndicator: () => dispatch({ type: 'INDICATOR_FETCH_REQUESTED'}),
    storeIndicator: (indicatorMap: Object) => dispatch({ type: 'INDICATOR_MAP_CREATED', indicatorMap: indicatorMap})
   }),
)(Layout);

export default ConnectedPage;
