import React, { Component } from 'react';

import { View } from 'react-native';

import { connect } from 'react-redux';

// import styles from './styles';

class ViewCafeScreen extends Component {
  render() {
    return (
      <View />
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ViewCafeScreen);
