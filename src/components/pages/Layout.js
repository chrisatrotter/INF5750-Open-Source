//@flow
import React, { Component } from "react";
import { connect } from 'react-redux';
import Header from "./../layout/Header";
import DisplayPage from './DisplayPage';

import type { Indicator } from '../../types'

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
  render() {
    if (this.props.indicators) {
      const indicatorMap = storeIndicator(this.props.indicators)
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

function storeIndicator(indicators: Array<Indicator>) {
  const indicatorMap = {}
  indicators.forEach(indicator => {
    const inside = {}
    inside["Level1"] = indicator.Level1
    inside["ShortName"] = indicator.ShortName
    inside["Definition"] = indicator.Definition
    inside["MeasurementType"] = indicator.MeasurementType
    indicatorMap[indicator.IndicatorId] = inside
  })
  return indicatorMap
}

const mapStateToProps = (state) => ({
	indicators: state.fetching.indicators
})

const mapDispatchToProps = (dispatch) => ({
  fetchCountries: () => dispatch({ type: 'COUNTRY_FETCH_REQUESTED' }),
  fetchIndicator: () => dispatch({ type: 'INDICATOR_FETCH_REQUESTED'}),
  storeIndicator: (indicatorMap: Object) => dispatch({ type: 'INDICATOR_MAP_CREATED', indicatorMap: indicatorMap})
})

const ConnectedPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);

export default ConnectedPage;
