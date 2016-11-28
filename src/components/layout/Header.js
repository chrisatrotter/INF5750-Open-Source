//@flow
import React, { Component } from 'react';
import Title from "./Header/Title";
import Logo from "./Header/Logo";
import styles from '../../styles/headerstyle';


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
