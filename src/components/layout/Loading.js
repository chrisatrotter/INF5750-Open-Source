//@flow
import React, { Component } from 'react' 
import CircularProgress from 'material-ui/CircularProgress' 
import styles from '../../styles/componentstyle' 

export default class Loading extends Component {
  render() {
    return (
      <div style={styles.loading}>
        <CircularProgress size={60} thickness={5} />
      </div>
    )
  }
}
