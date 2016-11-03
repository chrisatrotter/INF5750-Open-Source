//@flow
import React, { Component } from 'react';
import './App.css';

import StepperLayout from './components/StepperLayout.js';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class App extends Component {

  render() {
    return (
      <div>
        <StepperLayout />
      </div>
    );
  }
}

export default App;
