//@flow
import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import styles from '../../styles/componentstyle';

// Pass down some props from the Layout to know what step it is at.
export default class Loading extends Component {
  render() {
    return (
      <div style={styles.loading}>
        <CircularProgress size={60} thickness={5} />
      </div>
    )
  }
}
