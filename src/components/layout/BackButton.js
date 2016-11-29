//@flow
import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import styles from '../../styles/componentstyle';

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
