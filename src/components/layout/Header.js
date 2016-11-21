//@flow
import React, { Component } from 'react';
import Title from "./Header/Title";
import Logo from "./Header/Logo";

// Figure out what I need to do to use the Text, View components in REACT.d
export default class Header extends Component {
  render() {
    return (
      <div style={styles.appearance}>
        <div style={styles.text}>
          <div style={styles.alignment}>
            <Logo logoStyle={styles.logo}/>
            <Title titleStyle={styles.title} subtitleStyle={styles.subtitle}/>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  appearance: {
    backgroundColor: '#000000',
    paddingTop: 15,
    paddingBottom: 15,
  },

  logo: {
    width:60,
    height:60,
    marginTop: 7,
    marginRight:12,
  },

  alignment: {
    display: 'flex',
  },

  text: {
    width: '100%',
    maxWidth: 700,
    margin: 'auto',
    fontFamily: 'sans-serif'
  },

  title: {
    color: '#FEFEFE',
    fontSize: 42,
    fontWeight: 'bold',
    flex: 1,
  },

  subtitle: {
    color: '#FEFEFE',
    fontSize: 18,
    fontWeight: 'normal',
    flex: 1,
  },
};
