//@flow
import React, { Component } from 'react' 

export default class Logo extends Component {
  render() {
    return (
      <img src={require('../../../../public/logo.png')} role={"presentation"} style={this.props.logoStyle} />
    ) 
  }
}
