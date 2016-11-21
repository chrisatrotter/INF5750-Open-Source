//@flow
import React, { Component } from 'react';

// Pass down some props from the Layout to know what step it is at.
export default class DisplayText extends Component {
  render() {
    return (
      <div style={styles.appearance}>
        <p style={styles.text}> {this.props.text} </p>
      </div>
    )
  }
}

const styles = {
  appearance: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    fontFamily: 'Courier New',
		fontWeight: 'bold',
		marginTop: 12,
  }
};
