import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import NavUserInfo from './NavUserInfo';

const styles = {
  navTopImageContainer: {
    padding: 15,
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  bgImageWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  bgImage: {
    flex: 1,
    width: null,
    height: null,
  },
  navLogo: {
    height: 40,
    marginBottom: 10,
    width: 100,
    resizeMode: 'contain',
  },
};

class NavTopArea extends Component {
  render() {
    // console.log('nav top area props', this.props.navigation);
    return (
      <View style={styles.navTopImageContainer}>
        <View style={styles.bgImageWrapper}>
          <Image
            source={require('../../../../assets/images/header_bg.jpg')}
            resizeMode="cover"
            style={styles.bgImage}
          />
        </View>
        <Image
          source={require('../../../../assets/images/logo.png')}
          resizeMethod="scale"
          style={styles.navLogo}
        />
        <NavUserInfo navigation={this.props.navigation} />
      </View>
    );
  }
}

export default NavTopArea;
