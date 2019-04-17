import React, { Component } from 'react';

import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';

import { demoBeanIncrement } from '../actions';

// import styles from './styles';

class EquipmentScreen extends Component {
  static navigationOptions = {
    title: 'Equipment',
  };

  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.state);
    return (
      <ScrollView style={{padding:15}}>
        <Text>HELLO NADIA I WILL KILL YOU IN YOUR SLEEP.</Text>
        <Text>Val: {this.props.state.beans.fakeCounter}</Text>
        <TouchableOpacity onPress={() => { this.props.demoBeanIncrement() }}><Text>Increment the number</Text></TouchableOpacity>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({state});

export default connect(mapStateToProps, { demoBeanIncrement })(EquipmentScreen);
