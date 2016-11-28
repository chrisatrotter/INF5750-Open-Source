//@flow
import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import styles from '../../styles/componentstyle';

// Pass down some props from the Layout to know what step it is at.
export default class ListButton extends Component {
  render() {
    if(this.props.stepIndex === 0)
      return <div></div>

    return (
      <div style={styles.backButton}>
        <RaisedButton label="Back"
                      primary={true}
                      onClick={this.props.onClick} />
        </div>
    )
  }
}
