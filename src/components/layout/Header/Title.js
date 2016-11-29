//@flow
import React, { Component } from 'react' 
import SubTitle from "./SubTitle" 

export default class Title extends Component {
  render() {
    return (
      <div style={this.props.titleStyle}>
        DHIS
        <SubTitle subTitleStyle={this.props.subtitleStyle}/>
      </div>
    ) 
  }
}
