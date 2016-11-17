//@flow
import React, { Component } from 'react';
import Title from "./Header/Title";
import SubTitle from "./Header/SubTitle";

// Figure out what I need to do to use the Text, View components in REACT.d
export default class Header extends Component {
  render() {
    return (
      <div style={styles.appearance}>
        <div style={styles.text}>
          <Title titleStyle={styles.title}/>
          <SubTitle subTitleStyle={styles.subtitle}/>
          </div>
      </div>
    );
  }
}

const styles = {
  appearance: {
    backgroundColor: '#000000',
    paddingTop: 30,
    paddingBottom: 10,
  },

  text: {
    width: '100%',
    maxWidth: 700,
    margin: 'auto',
  },

  title: {
    color: '#FEFEFE',
    fontSize: 42,
    fontWeight: 'bold',
    flex: 1,
  },

  subtitle: {
    color: '#FEFEFE',
    fontWeight: 'normal',
    flex: 1,
  },
};
