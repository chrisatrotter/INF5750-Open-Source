//@flow
import React, { Component } from 'react';
import styles from '../../styles/componentstyle';

export default class DisplayText extends Component {
  render() {
    return (
      <div style={styles.appearance}>
        <p style={styles.text}> {this.props.text} </p>
      </div>
    )
  }
}
