//@flow
import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';

// Pass down some props from the Layout to know what step it is at.
export default class ListButton extends Component {
  render() {
    return (
      <FlatButton style={styles.appearance}
  											 key={this.props.key}
  								 		 	 hoverColor={'#B5D66B'}
  								 		 	 label={this.props.label}
  								 		 	 labelStyle={{textTransform: 'capitalize'}}
  								 		 	 onClick={this.props.onClick}/>
    )
  }
}

const styles = {
  appearance: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
};
