//@flow
import React, { Component } from 'react';

// Figure out what I need to do to use the Text, View components in REACT.d
export default class Logo extends Component {
  render() {
    return (
      <img src={require('../../../../public/logo2.png')} role={"presentation"} style={this.props.logoStyle} />
    );
  }
}
