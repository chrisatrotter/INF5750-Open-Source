//@flow
import React, { Component } from "react";
import { connect } from 'react-redux';
import Header from "./../layout/Header";
import DisplayPage from './DisplayPage';
import type { Indicator } from '../../actions'

class Layout extends Component {
  props: {
    indicators: Array<Indicator>,
    fetchIndicator: () => void,
    fetchCountries: () => void,
    storeIndicator: (indicatorMap: Object) => void,
  }
  componentWillMount() {
    this.props.fetchCountries()
    this.props.fetchIndicator()
  }
  storeIndicator(indicators: Array<Indicator>) {
    const indicatorMap = {}
    this.props.indicators.forEach(indicator => {
      const inside = {}
      inside["Definition"] = indicator.Definition
      inside["Level1"] = indicator.Level1
      indicatorMap[indicator.IndicatorId] = inside
    })
    return indicatorMap
  }

  render() {
    if (this.props.indicators) {
      const indicatorMap = this.storeIndicator(this.props.indicators)
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
    storeIndicator: (indicatorMap: Object) => dispatch({ type: 'INDICATOR_MAP_CREATED', indicatorMap: indicatorMap}),
   }),
)(Layout);

export default ConnectedPage;
