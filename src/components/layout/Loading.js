//@flow
import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';


const styles = {
  appearance: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
};

// Pass down some props from the Layout to know what step it is at.
export default class Loading extends Component {
  render() {
    return (
      <div style={styles.appearance}>
        <CircularProgress size={60} thickness={5} />
      </div>
    )
  }
}
