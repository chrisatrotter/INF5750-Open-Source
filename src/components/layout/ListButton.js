//@flow
import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import styles from '../../styles/componentstyle';

// Pass down some props from the Layout to know what step it is at.
export default class ListButton extends Component {
  render() {
    return (
      <FlatButton style={styles.appearance}
  								 		 	 hoverColor={'#B5D66B'}
  								 		 	 label={this.props.label}
  								 		 	 labelStyle={{textTransform: 'capitalize'}}
  								 		 	 onClick={this.props.onClick}/>
    )
  }
}
