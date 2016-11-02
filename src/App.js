//@flow
import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import SurveyStepper from './components/SurveyStepper';

injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <SurveyStepper />
    )
  }
}

export default App;
